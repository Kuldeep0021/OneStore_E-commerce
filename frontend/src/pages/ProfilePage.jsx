import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Package, User as UserIcon } from 'lucide-react';
import api from '../api';

const ProfilePage = () => {
  const { user } = useStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (!user) {
    return <div className="text-center py-20 text-xl font-serif">Please log in to view your profile.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Profile Sidebar */}
        <div className="w-full md:w-1/3 bg-gray-50 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-brand-accent rounded-full flex items-center justify-center text-white mb-4">
              <UserIcon className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-serif">{user.name}</h2>
            <p className="text-gray-500 font-light text-sm mt-1">{user.email}</p>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Account Details</h3>
            <ul className="space-y-4 font-light text-sm text-gray-600">
              <li>Role: {user.role === 'admin' ? 'Administrator' : 'Customer'}</li>
              <li>Member since: {new Date().getFullYear()}</li>
            </ul>
          </div>
        </div>

        {/* Order History */}
        <div className="flex-1">
          <div className="flex items-center mb-8">
            <Package className="w-6 h-6 mr-3 text-brand-accent" />
            <h2 className="text-2xl font-serif uppercase tracking-widest">Order History</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-accent"></div></div>
          ) : orders.length === 0 ? (
            <div className="bg-gray-50 p-8 text-center">
              <p className="text-gray-500 font-light mb-4">You have not placed any orders yet.</p>
              <a href="/#categories" className="text-brand-accent uppercase tracking-widest text-xs font-bold hover:underline">Start Shopping</a>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="border border-gray-100 p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between mb-4 border-b border-gray-100 pb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Order ID</p>
                      <p className="font-mono text-sm">{order._id}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Date</p>
                      <p className="font-light text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total</p>
                      <p className="font-medium text-sm text-brand-accent">₹{order.totalAmount.toLocaleString()}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full 
                        ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.orderStatus === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img src={item.image.startsWith('http') || item.image.startsWith('/') ? item.image : `/${item.image}`} alt={item.name} className="w-16 h-16 object-contain border border-gray-100 p-1" />
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500 font-light">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm font-light">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
