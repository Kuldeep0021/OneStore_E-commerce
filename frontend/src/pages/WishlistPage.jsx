import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';
import api from '../api';
import { useStore } from '../store';

const WishlistPage = () => {
  const [loading, setLoading] = useState(true);
  const { wishlist, setWishlist, addToCart, user } = useStore();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get('/users/wishlist');
        setWishlist(data);
      } catch (err) {
        console.error('Failed to fetch wishlist', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [user, setWishlist]);

  const handleRemove = async (productId) => {
    try {
      const { data } = await api.post(`/users/wishlist/${productId}`);
      setWishlist(data);
    } catch (err) {
      console.error('Failed to remove from wishlist', err);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-accent"></div></div>;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h2 className="text-3xl font-serif mb-4">Please log in</h2>
        <p className="text-gray-500 mb-8 font-light">You need to be logged in to view your wishlist.</p>
        <Link to="/login" className="bg-brand-accent text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-brand-primary transition-colors">Log In</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
      <h1 className="text-3xl font-serif tracking-wider uppercase mb-12 text-center">Your Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-8 font-light text-lg">Your wishlist is empty.</p>
          <Link to="/#categories" className="bg-transparent border border-brand-primary text-brand-primary px-8 py-3 uppercase tracking-widest text-sm hover:bg-brand-primary hover:text-white transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <div key={product._id} className="group relative">
              <Link to={`/product/${product._id}`} className="block relative h-80 overflow-hidden bg-gray-50 mb-4">
                <img 
                  src={product.images?.[0]?.startsWith('http') || product.images?.[0]?.startsWith('/') ? product.images[0] : `/${product.images[0]}`} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-4"
                />
              </Link>
              <div className="text-center">
                <h3 className="text-sm uppercase tracking-widest text-brand-text mb-2 font-medium truncate px-2">{product.name}</h3>
                <p className="text-brand-accent font-serif italic text-lg mb-4">₹{product.price.toLocaleString()}</p>
                <div className="flex justify-center space-x-4">
                  <button onClick={() => handleAddToCart(product)} className="text-gray-500 hover:text-brand-accent transition-colors" title="Add to Cart">
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleRemove(product._id)} className="text-gray-500 hover:text-red-500 transition-colors" title="Remove">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
