import { useState, useEffect } from 'react';
import api from '../../api';
import { Package, Users, ShoppingCart, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, ordRes, usrRes] = await Promise.all([
          api.get('/products/all'),
          api.get('/orders'),
          api.get('/auth/users')
        ]);
        
        const productsCount = prodRes.data.length;
        const ordersCount = ordRes.data.length;
        const usersCount = usrRes.data.length;
        const revenue = ordRes.data.reduce((acc, order) => order.paymentStatus === 'Paid' ? acc + order.totalAmount : acc, 0);

        setStats({ products: productsCount, orders: ordersCount, users: usersCount, revenue });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Total Orders', value: stats.orders, icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Total Products', value: stats.products, icon: Package, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Registered Users', value: stats.users, icon: Users, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`rounded-md p-3 ${item.bg}`}>
                      <Icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{item.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
