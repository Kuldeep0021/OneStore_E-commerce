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
        
        {/* Newsletter Section Removed */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <span className="font-sans text-2xl font-black tracking-tight mb-4 block text-white">GIGGLETOYZ.IN</span>
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
              <li>
                <a href={`https://wa.me/${(settings?.phone || '919999155976').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-green-500 hover:text-green-400 font-medium transition-colors">
                  <span className="mr-2 text-lg">💬</span> WhatsApp: {settings?.phone || '+91 9999155976'}
                </a>
              </li>
              <li className="leading-relaxed whitespace-pre-wrap">{settings?.address || 'India'}</li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs font-light tracking-wide mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} GiggleToyz.in. All Rights Reserved.
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
