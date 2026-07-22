import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Heart } from 'lucide-react';
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
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left: Navigation Links */}
          <div className="flex-1 flex items-center space-x-8 hidden md:flex">
            <Link to="/" className="text-sm tracking-widest uppercase text-brand-text hover:text-brand-accent transition-colors">Home</Link>
            <a href="/#categories" className="text-sm tracking-widest uppercase text-brand-text hover:text-brand-accent transition-colors">Collections</a>
            {user && user.role === 'admin' && (
              <Link to="/admin" className="text-sm tracking-widest uppercase text-brand-text hover:text-brand-accent transition-colors">Admin</Link>
            )}
          </div>

          {/* Center: Brand Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="flex items-center">
              <span className="font-serif text-3xl md:text-4xl font-bold text-brand-primary tracking-[0.2em] uppercase">OneStore</span>
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex-1 flex items-center justify-end space-x-6">
            {user ? (
              <div className="relative flex items-center space-x-6">
                <span className="text-sm text-gray-700 hidden sm:block tracking-wide">Welcome, {user.name}</span>
                <Link to="/profile" className="text-brand-text hover:text-brand-accent transition-colors" title="My Profile">
                  <User className="h-5 w-5" strokeWidth={1.5} />
                </Link>
                <button onClick={handleLogout} className="text-brand-text hover:text-brand-accent transition-colors" title="Log Out">
                  <LogOut className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-brand-text hover:text-brand-accent transition-colors">
                <User className="h-5 w-5" strokeWidth={1.5} />
              </Link>
            )}

            <Link to="/wishlist" className="text-brand-text hover:text-brand-accent transition-colors">
              <Heart className="h-5 w-5" strokeWidth={1.5} />
            </Link>

            <Link to="/cart" className="text-brand-text hover:text-brand-accent transition-colors relative">
              <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
