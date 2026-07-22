import { useState } from 'react';
import { useStore } from '../../store';
import api from '../../api';

const AdminSettings = () => {
  const { user, login } = useStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const { data } = await api.put('/users/profile', {
        name,
        email,
        password: password || undefined,
      });
      
      // Update the global store with new user data. 
      // If token is not returned, we could reuse the existing token.
      // But we just updated the route to return the current token.
      login(data, data.token); 
      setMessage('Profile updated successfully!');
      setPassword(''); 
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-sm rounded-lg border border-gray-100">
      <h2 className="text-2xl font-semibold text-brand-primary mb-6">Admin Settings</h2>
      
      {message && (
        <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6 border border-green-200">
          {message}
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6 border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">New Password (leave blank to keep current)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            minLength="6"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex justify-center py-3 mt-4"
        >
          {loading ? 'Updating...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
