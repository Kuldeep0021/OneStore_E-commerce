import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Heart, Menu, X } from 'lucide-react';
import { useStore } from '../store';

const Navbar = () => {
  const { user, cart, logout } = useStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-black sticky top-0 z-50 border-b border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-2">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden flex-1">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Left: Navigation Links (Desktop) */}
          <div className="flex-1 items-center space-x-8 hidden md:flex">
            <Link to="/" className="text-sm tracking-widest uppercase text-gray-300 hover:text-white transition-colors p-2 min-h-[44px] flex items-center font-medium">Home</Link>
            <a href="/#categories" className="text-sm tracking-widest uppercase text-gray-300 hover:text-white transition-colors p-2 min-h-[44px] flex items-center font-medium">Collections</a>
            {user && user.role === 'admin' && (
              <Link to="/admin" className="text-sm tracking-widest uppercase text-gray-300 hover:text-white transition-colors p-2 min-h-[44px] flex items-center font-medium">Admin</Link>
            )}
          </div>

          {/* Center: Brand Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="flex items-center min-h-[44px]" onClick={closeMenu}>
              <img src="/logo.png" alt="GiggleToyz" className="h-20 sm:h-24 w-auto object-contain" />
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex-1 flex items-center justify-end space-x-1 sm:space-x-2">
            {user ? (
              <div className="relative flex items-center space-x-1 sm:space-x-2">
                <span className="text-sm text-gray-400 hidden lg:block tracking-wide">Welcome, {user.name}</span>
                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" title="My Profile">
                  <User className="h-5 w-5" strokeWidth={1.5} />
                </Link>
                <button onClick={handleLogout} className="text-gray-300 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] items-center justify-center hidden sm:flex" title="Log Out">
                  <LogOut className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <User className="h-5 w-5" strokeWidth={1.5} />
              </Link>
            )}

            <Link to="/wishlist" className="text-gray-300 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hidden sm:flex">
              <Heart className="h-5 w-5" strokeWidth={1.5} />
            </Link>

            <Link to="/cart" className="text-gray-300 hover:text-white transition-colors relative p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
              <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
              {cartItemsCount > 0 && (
                <span className="absolute top-1 right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
          
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-950 border-t border-gray-800 absolute w-full left-0">
          <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
            <Link to="/" onClick={closeMenu} className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-900 rounded-md">Home</Link>
            <a href="/#categories" onClick={closeMenu} className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-900 rounded-md">Collections</a>
            {user && user.role === 'admin' && (
              <Link to="/admin" onClick={closeMenu} className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-900 rounded-md">Admin Dashboard</Link>
            )}
            <Link to="/wishlist" onClick={closeMenu} className="block sm:hidden px-3 py-4 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-900 rounded-md">My Wishlist</Link>
            {user && (
              <button onClick={handleLogout} className="block sm:hidden w-full text-left px-3 py-4 text-base font-medium text-red-400 hover:bg-gray-900 rounded-md">
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
