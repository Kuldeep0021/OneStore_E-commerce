import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Tag, ShoppingBag, Users, ShoppingCart, LogOut } from 'lucide-react';
import { useStore } from '../store';

const AdminLayout = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Categories', path: '/admin/categories', icon: Tag },
    { name: 'Products', path: '/admin/products', icon: ShoppingBag },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Users', path: '/admin/users', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-luora-primary text-white flex flex-col">
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <span className="font-serif text-2xl font-bold tracking-wider">LUORA ADMIN</span>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-300" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
          <button onClick={handleLogout} className="flex-shrink-0 w-full group block text-gray-300 hover:text-white flex items-center justify-center space-x-2">
            <LogOut className="h-5 w-5 text-gray-400 group-hover:text-gray-300" />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow justify-between items-center px-4">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
          </div>
          <div className="flex items-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-luora-primary">Return to Storefront</Link>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
