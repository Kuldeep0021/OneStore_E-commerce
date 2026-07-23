import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, Heart, Star } from 'lucide-react';
import api, { getImageUrl } from '../api';
import { useStore } from '../store';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addToCart, wishlist, setWishlist } = useStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [added, setAdded] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewError, setReviewError] = useState('');

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
      if (data.images && data.images.length > 0) {
        setMainImage(data.images[0]);
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = async () => {
    if (!user) return navigate('/login');
    try {
      const { data } = await api.post(`/users/wishlist/${id}`);
      setWishlist(data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    try {
      await api.post(`/products/${id}/reviews`, { rating, comment });
      setRating(0);
      setComment('');
      fetchProduct();
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Error submitting review');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div></div>;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  const isWishlisted = wishlist.some(item => (item._id || item) === id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 mb-16 sm:mb-24">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse lg:flex-row lg:space-x-4">
          <div className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 mt-4 lg:mt-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {product.images?.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setMainImage(img)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden border-2 transition-all ${mainImage === img ? 'border-brand-accent scale-105' : 'border-transparent'}`}
              >
                <img src={getImageUrl(img)} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="w-full relative overflow-hidden lg:flex-1 h-[350px] sm:h-[450px] lg:h-[600px] bg-gray-50 group rounded-lg">
            {mainImage ? (
              <img src={getImageUrl(mainImage)} alt={product.name} className="w-full h-full object-contain transition-transform duration-700 lg:group-hover:scale-150 origin-center p-4 sm:p-8" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">No Image</div>
            )}
            <button onClick={handleWishlist} className={`absolute top-4 right-4 p-3 rounded-full shadow transition-colors ${isWishlisted ? 'bg-brand-accent text-white' : 'bg-white text-gray-400 hover:text-brand-accent'}`}>
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-8 sm:mt-10 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-brand-primary tracking-wide mb-2 uppercase leading-tight">{product.name}</h1>
          
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="flex items-center text-brand-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500 font-light">({product.numReviews} Reviews)</span>
          </div>

          <p className="text-2xl sm:text-3xl text-brand-accent font-serif italic mb-6 sm:mb-8">₹{product.price.toLocaleString()}</p>
          
          <div className="text-sm sm:text-base text-gray-600 font-light leading-relaxed mb-8 sm:mb-10 prose max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />

          <div className="flex items-center space-x-4 mb-6 sm:mb-8">
            <button
              type="button"
              disabled={product.stockQuantity === 0}
              onClick={handleAddToCart}
              className={`w-full py-4 uppercase tracking-widest text-sm font-bold text-white transition-colors rounded-md shadow-md
                ${product.stockQuantity === 0 ? 'bg-gray-400 cursor-not-allowed' : added ? 'bg-green-600' : 'bg-brand-primary hover:bg-black'}`}
            >
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>
          
          <div className="flex items-center border-t border-gray-200 pt-6">
            {product.stockQuantity > 0 ? (
              <span className="text-sm text-green-600 flex items-center tracking-wide"><Check className="w-4 h-4 mr-2"/> Available in stock</span>
            ) : (
              <span className="text-sm text-red-600 tracking-wide uppercase">Out of stock</span>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-gray-200 pt-12 sm:pt-16">
        <h2 className="text-2xl sm:text-3xl font-serif text-center uppercase tracking-wider mb-8 sm:mb-12 text-brand-primary">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            {product.reviews.length === 0 ? (
              <p className="text-gray-500 font-light">No reviews yet. Be the first to review this elegant piece.</p>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                {product.reviews.map(review => (
                  <div key={review._id} className="border-b border-gray-100 pb-6">
                    <div className="flex items-center mb-2">
                      <span className="font-bold mr-4">{review.name}</span>
                      <div className="flex text-brand-accent">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2">{review.createdAt.substring(0, 10)}</p>
                    <p className="text-sm sm:text-base text-gray-700 font-light leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-6 sm:p-8 rounded-lg">
            <h3 className="text-lg sm:text-xl font-serif mb-4 sm:mb-6 text-brand-primary">Write a Review</h3>
            {user ? (
              <form onSubmit={submitReview} className="space-y-4">
                {reviewError && <p className="text-red-500 text-sm">{reviewError}</p>}
                <div>
                  <label className="block text-sm sm:text-base text-gray-700 mb-2 font-medium">Rating</label>
                  <select value={rating} onChange={(e) => setRating(e.target.value)} className="w-full border border-gray-300 rounded-md p-3 font-light text-base bg-white focus:ring-brand-accent focus:border-brand-accent" required>
                    <option value="">Select a rating...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm sm:text-base text-gray-700 mb-2 font-medium">Comment</label>
                  <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="4" className="w-full border border-gray-300 rounded-md p-3 font-light text-base focus:ring-brand-accent focus:border-brand-accent placeholder-gray-400" placeholder="Share your thoughts..." required></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-primary text-white px-6 py-4 uppercase tracking-widest text-sm font-bold rounded-md hover:bg-black transition-colors shadow-md mt-2">Submit Review</button>
              </form>
            ) : (
              <p className="text-gray-500 font-light text-sm sm:text-base">Please <a href="/login" className="text-brand-accent font-medium hover:underline">sign in</a> to write a review.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
