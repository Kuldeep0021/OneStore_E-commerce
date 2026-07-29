import { useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, CheckCircle, AlertCircle, QrCode, ArrowLeft } from 'lucide-react';
import { useStore } from '../store';

const CompleteOrder = () => {
  const navigate = useNavigate();
  const { cart, cartTotal } = useStore();

  const steps = [
    {
      number: '01',
      title: 'Call or WhatsApp Us',
      description: 'Contact us to confirm product availability and delivery details before making any payment.',
      icon: Phone,
      color: 'from-pink-500 to-rose-500',
    },
    {
      number: '02',
      title: 'Scan & Pay via UPI',
      description: 'After confirmation, scan the QR code below to pay using any UPI app — Paytm, PhonePe, Google Pay, BHIM, etc.',
      icon: QrCode,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      number: '03',
      title: 'Share Payment Screenshot',
      description: 'Once payment is successful, share the payment screenshot or UPI Transaction ID on WhatsApp.',
      icon: MessageCircle,
      color: 'from-green-500 to-teal-500',
    },
    {
      number: '04',
      title: 'Order Confirmed!',
      description: "We'll verify your payment and confirm your order immediately after.",
      icon: CheckCircle,
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 py-10 sm:py-14 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative z-10 px-4">
          <div className="text-4xl sm:text-5xl font-black tracking-tight mb-1">
            <span className="text-white">Giggle</span>
            <span className="text-yellow-300">Toyz</span>
            <span className="text-2xl sm:text-3xl ml-1">🌟</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mt-3 mb-2">Complete Your Order</h1>
          <p className="text-pink-100 text-sm sm:text-base max-w-xl mx-auto font-light">
            Thank you for shopping with GiggleToyz! Follow these simple steps to place your order.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-5 sm:p-6 mb-10">
            <h2 className="text-lg font-bold text-gray-800 mb-4">🛒 Your Order Summary</h2>
            <div className="divide-y divide-gray-100">
              {cart.filter(item => item && item.product).map((item) => (
                <div key={item.product._id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{item.product.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-pink-600">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="font-bold text-gray-800">Total Amount</span>
              <span className="text-2xl font-black text-pink-600">₹{cartTotal().toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Important Notice */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-xl p-4 sm:p-5 mb-10 flex gap-3">
          <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-800 mb-1">Important — Please Read Before Paying</p>
            <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside font-light">
              <li>Please make payments <strong>only after</strong> receiving confirmation from our team.</li>
              <li>Orders are processed only after payment verification.</li>
              <li>If you have any questions, our team is happy to assist before you pay.</li>
            </ul>
          </div>
        </div>

        {/* Steps */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-8">How to Place Your Order</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`bg-gradient-to-br ${step.color} p-3 rounded-xl flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">Step {step.number}</div>
                    <h3 className="font-bold text-gray-800 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-500 font-light leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* QR Code + Contact Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* QR Code */}
          <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 sm:p-8 text-center">
            <h3 className="font-bold text-gray-800 mb-2 text-lg">Scan to Pay via UPI</h3>
            <p className="text-sm text-gray-400 mb-5 font-light">Use any UPI app to scan</p>
            {/* QR Placeholder — replace src with actual QR image */}
            <div className="inline-flex items-center justify-center w-48 h-48 bg-gray-50 rounded-xl border-2 border-dashed border-pink-200 mx-auto mb-4">
              <div className="text-center">
                <QrCode className="w-16 h-16 text-pink-300 mx-auto mb-2" />
                <p className="text-xs text-gray-400">UPI QR Code</p>
                <p className="text-xs text-pink-400 font-medium">Coming Soon</p>
              </div>
            </div>
            <div className="flex justify-center gap-2 flex-wrap mt-2">
              {['Paytm', 'PhonePe', 'GPay', 'BHIM'].map(app => (
                <span key={app} className="px-2 py-1 bg-pink-50 text-pink-600 text-xs rounded-full font-medium border border-pink-100">{app}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 sm:p-8 flex flex-col justify-center">
            <h3 className="font-bold text-gray-800 mb-2 text-lg text-center">Customer Support</h3>
            <p className="text-sm text-gray-400 mb-6 text-center font-light">We're here to help you!</p>
            
            <a
              href="tel:+919999155976"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-6 rounded-xl mb-4 hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 transform"
            >
              <Phone className="w-5 h-5" />
              <div className="text-left">
                <div className="text-xs opacity-80 font-normal">Call Us</div>
                <div>+91 9999155976</div>
              </div>
            </a>

            <a
              href="https://wa.me/919999155976"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 transform"
            >
              <MessageCircle className="w-5 h-5" />
              <div className="text-left">
                <div className="text-xs opacity-80 font-normal">WhatsApp</div>
                <div>+91 9999155976</div>
              </div>
            </a>

            <p className="text-center text-xs text-gray-400 mt-5 font-light">
              Available Mon–Sun · 9 AM – 9 PM
            </p>
          </div>
        </div>

        {/* Thank you footer */}
        <div className="text-center py-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl text-white shadow-lg">
          <div className="text-2xl mb-2">🎉</div>
          <p className="font-bold text-lg mb-1">Thank you for choosing GiggleToyz!</p>
          <p className="text-pink-100 text-sm font-light">We promise to make your child's joy our priority.</p>
        </div>

        {/* Back button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-pink-600 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteOrder;
