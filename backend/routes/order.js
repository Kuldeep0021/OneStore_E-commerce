import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { items, shippingDetails } = req.body;

  try {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }
    if (!shippingDetails || !shippingDetails.address) {
      return res.status(400).json({ message: 'Shipping details are required' });
    }
    
    // Secure price calculation from DB
    let serverTotalAmount = 0;
    const validatedItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: `Product not found: ${item.product}` });
      serverTotalAmount += product.price * item.quantity;
      validatedItems.push({
        product: product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price
      });
    }

    // Create Razorpay Order
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(serverTotalAmount * 100), // amount in smallest currency unit
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const order = await Order.create({
      user: req.user.id,
      items: validatedItems,
      shippingDetails,
      totalAmount: serverTotalAmount,
      razorpayOrderId: razorpayOrder.id,
    });

    res.status(201).json({
      order,
      razorpayOrder
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/verify', protect, async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  try {
    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({ message: 'Missing payment details' });
    }

    const sign = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpaySignature === expectedSign) {
      const order = await Order.findOne({ razorpayOrderId });
      if (order) {
        order.paymentStatus = 'Paid';
        order.razorpayPaymentId = razorpayPaymentId;
        order.razorpaySignature = razorpaySignature;
        await order.save();
        res.json({ message: "Payment verified successfully", order });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    order.orderStatus = orderStatus;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
