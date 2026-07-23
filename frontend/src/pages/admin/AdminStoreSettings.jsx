import { useState, useEffect } from 'react';
import { useStore } from '../../store';
import api from '../../api';

const AdminStoreSettings = () => {
  const { settings, setSettings } = useStore();
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    privacyPolicy: '',
    refundPolicy: '',
    shippingPolicy: '',
    termsOfService: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('contact'); // 'contact' or 'policies'

  useEffect(() => {
    if (settings) {
      setFormData({
        email: settings.email || '',
        phone: settings.phone || '',
        address: settings.address || '',
        privacyPolicy: settings.privacyPolicy || '',
        refundPolicy: settings.refundPolicy || '',
        shippingPolicy: settings.shippingPolicy || '',
        termsOfService: settings.termsOfService || ''
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const { data } = await api.put('/settings', formData);
      setSettings(data);
      setMessage('Store settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update store settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 shadow-sm rounded-lg border border-gray-100">
      <h2 className="text-2xl font-semibold text-brand-primary mb-6">Store Information & Policies</h2>
      
      {message && <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6">{message}</div>}
      {error && <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">{error}</div>}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
        <button
          className={`py-2 px-6 font-medium text-sm transition-colors ${activeTab === 'contact' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact Details
        </button>
        <button
          className={`py-2 px-6 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'policies' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('policies')}
        >
          Store Policies
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {activeTab === 'contact' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone Number</label>
              <input type="text" name="phone" required value={formData.phone} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Address</label>
              <textarea name="address" required value={formData.address} onChange={handleChange} rows="3" className="input-field"></textarea>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Privacy Policy (HTML allowed)</label>
              <textarea name="privacyPolicy" value={formData.privacyPolicy} onChange={handleChange} rows="8" className="input-field font-mono text-sm"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Refund Policy (HTML allowed)</label>
              <textarea name="refundPolicy" value={formData.refundPolicy} onChange={handleChange} rows="8" className="input-field font-mono text-sm"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Policy (HTML allowed)</label>
              <textarea name="shippingPolicy" value={formData.shippingPolicy} onChange={handleChange} rows="8" className="input-field font-mono text-sm"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Terms of Service (HTML allowed)</label>
              <textarea name="termsOfService" value={formData.termsOfService} onChange={handleChange} rows="8" className="input-field font-mono text-sm"></textarea>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-gray-100">
          <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto px-8 py-3">
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminStoreSettings;
