import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useStore } from '../store';

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart, user } = useStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (cart.length === 0 && !success) {
      navigate('/cart');
    }
  }, [cart, navigate, success]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load. Are you offline?');
      }

      // Create order on backend
      const orderData = {
        items: cart.map(item => ({ product: item.product._id, quantity: item.quantity, priceAtPurchase: item.product.price })),
        shippingDetails: formData,
        totalAmount: cartTotal()
      };

      const { data } = await api.post('/orders', orderData);
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Use env variable in real app
        amount: data.razorpayOrder.amount,
        currency: "INR",
        name: "Luora Jewellery",
        description: "Test Transaction",
        order_id: data.razorpayOrder.id,
        handler: async function (response) {
          try {
            const verifyRes = await api.post('/orders/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            });
            
            if (verifyRes.data.message === "Payment verified successfully") {
              setSuccess(true);
              clearCart();
            }
          } catch (err) {
            setError(err.response?.data?.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#2d2d2d"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred during checkout');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="bg-green-100 text-green-800 p-8 rounded-lg">
          <h2 className="text-3xl font-serif mb-4">Thank you for your order!</h2>
          <p className="text-lg mb-8">Your payment was successful and your order is being processed.</p>
          <Link to="/" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-serif mb-8 text-center">Checkout</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Shipping Information</h2>
            
            {error && <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">{error}</div>}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 input-field" required />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 input-field" required />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 input-field" required />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Full Address</label>
                <textarea id="address" name="address" rows="3" value={formData.address} onChange={handleChange} className="mt-1 input-field" required></textarea>
              </div>
            </div>

            <div className="mt-8">
              <button type="submit" disabled={loading} className="w-full btn-primary flex justify-center items-center">
                {loading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> : `Pay ₹${cartTotal().toLocaleString()}`}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-10 lg:mt-0 lg:col-span-5 bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.product._id} className="py-4 flex">
                <img src={item.product.images[0]?.startsWith('http') ? item.product.images[0] : `http://localhost:5000${item.product.images[0]}`} alt={item.product.name} className="w-16 h-16 rounded-md object-cover" />
                <div className="ml-4 flex-1 flex flex-col justify-center">
                  <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="ml-4 flex items-center">
                  <p className="text-sm font-medium text-gray-900">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="pt-6 mt-6 border-t border-gray-200">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total</p>
              <p>₹{cartTotal().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
