import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useStore } from '../store';

const Navbar = () => {
  const { user, cart, logout } = useStore();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-serif text-2xl font-bold text-luora-primary tracking-wider">LUORA</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            {user && user.role === 'admin' && (
              <Link to="/admin" className="text-sm font-medium text-gray-500 hover:text-luora-primary">Admin</Link>
            )}
            
            <Link to="/cart" className="text-gray-500 hover:text-luora-primary relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-luora-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative flex items-center space-x-4">
                <span className="text-sm text-gray-700 hidden sm:block">Hi, {user.name}</span>
                <button onClick={handleLogout} className="text-gray-500 hover:text-luora-primary">
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-500 hover:text-luora-primary">
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
