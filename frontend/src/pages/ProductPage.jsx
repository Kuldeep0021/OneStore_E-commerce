import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import api from '../api';
import { useStore } from '../store';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [added, setAdded] = useState(false);
  const addToCart = useStore(state => state.addToCart);

  useEffect(() => {
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
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luora-accent"></div></div>;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse lg:flex-row lg:space-x-4">
          <div className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 mt-4 lg:mt-0 overflow-x-auto lg:overflow-visible">
            {product.images?.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setMainImage(img)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${mainImage === img ? 'border-luora-accent' : 'border-transparent'}`}
              >
                <img src={img.startsWith('http') ? img : `http://localhost:5000${img}`} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden lg:flex-1 h-[500px]">
            {mainImage ? (
              <img src={mainImage.startsWith('http') ? mainImage : `http://localhost:5000${mainImage}`} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Image</div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-serif text-gray-900 tracking-tight">{product.name}</h1>
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-2xl text-gray-900">₹{product.price.toLocaleString()}</p>
          </div>
          
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 space-y-6" dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>

          <div className="mt-8 flex flex-col space-y-4">
            <div className="flex items-center">
              {product.stockQuantity > 0 ? (
                <span className="text-sm text-green-600 flex items-center"><Check className="w-4 h-4 mr-1"/> In stock ({product.stockQuantity} available)</span>
              ) : (
                <span className="text-sm text-red-600">Out of stock</span>
              )}
            </div>
            
            <button
              type="button"
              disabled={product.stockQuantity === 0}
              onClick={handleAddToCart}
              className={`w-full max-w-xs flex-1 flex items-center justify-center px-8 py-3 rounded-md text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-luora-accent transition-colors
                ${product.stockQuantity === 0 ? 'bg-gray-400 cursor-not-allowed' : added ? 'bg-green-600' : 'bg-luora-primary hover:bg-black'}`}
            >
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
