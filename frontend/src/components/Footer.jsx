import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useStore } from '../store';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [categories, setCategories] = useState([]);
  const settings = useStore(state => state.settings);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await api.post('/newsletter', { email });
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-brand-primary text-white pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-16 mb-16">
          <div className="mb-8 md:mb-0 text-center md:text-left md:max-w-lg">
            <h3 className="font-sans text-3xl font-bold mb-4">Join the OneStore Club</h3>
            <p className="text-gray-400 font-light text-sm">Subscribe for exclusive deals, new arrivals, and the best prices on everything you need.</p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-4 relative">
            <input 
              type="email" 
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-4 bg-transparent border border-gray-600 text-white focus:outline-none focus:border-white w-full sm:w-80 transition-colors placeholder-gray-500 font-light text-sm"
              required
            />
            <button type="submit" disabled={status === 'loading'} className="bg-white text-black px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gray-200 transition-colors duration-300">
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
            {status === 'success' && <p className="text-green-500 text-xs mt-2 absolute -bottom-6">Thank you for subscribing!</p>}
            {status === 'error' && <p className="text-red-500 text-xs mt-2 absolute -bottom-6">Failed to subscribe or already joined.</p>}
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <span className="font-sans text-2xl font-black tracking-tight mb-4 block text-white">OneStore</span>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Your one-stop destination for everything you need. Quality products delivered to your door at prices that beat every marketplace.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg tracking-wider mb-6 text-white">Shop</h4>
            <ul className="space-y-4">
              <li><Link to="/#categories" className="text-gray-400 hover:text-white transition-colors text-sm font-light">New Arrivals</Link></li>
              {categories.map((cat) => (
                <li key={cat._id}><Link to={`/category/${cat._id}`} className="text-gray-400 hover:text-white transition-colors text-sm font-light">{cat.name}</Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg tracking-wider mb-6 text-white">Help & Policies</h4>
            <ul className="space-y-4">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm font-light">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="text-gray-400 hover:text-white transition-colors text-sm font-light">Refund Policy</Link></li>
              <li><Link to="/shipping-policy" className="text-gray-400 hover:text-white transition-colors text-sm font-light">Shipping Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors text-sm font-light">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg tracking-wider mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li>📞 {settings?.phone || '+91 9999155976'}</li>
              <li>💬 <a href="https://wa.me/919999155976" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp: +91 9999155976</a></li>
              <li className="leading-relaxed whitespace-pre-wrap">{settings?.address || 'India'}</li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs font-light tracking-wide mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} OneStore. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs tracking-wider uppercase">Instagram</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs tracking-wider uppercase">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
