import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api, { getImageUrl } from '../api';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingProds, setLoadingProds] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoadingCats(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data.products || data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoadingProds(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section — Black */}
      <section className="bg-black w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            
            {/* Left: Text */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-pink-400 text-sm font-semibold uppercase tracking-widest mb-4">Trusted by thousands of families</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
                Where Kids
                <span className="block text-pink-400"> Come Alive!</span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Toys that spark imagination, build skills, and make childhood unforgettable — at prices the big marketplaces can't match.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href="#categories"
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-4 rounded-lg transition-colors text-sm"
                >
                  Shop Now
                </a>
                <a
                  href="https://wa.me/919999155976"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium px-8 py-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <span>💬</span> WhatsApp Us
                </a>
              </div>
            </div>

            {/* Right: Stats block */}
            <div className="flex-shrink-0 grid grid-cols-2 gap-4 w-full lg:w-auto lg:min-w-[320px]">
              {[
                { num: '500+', label: 'Toy varieties' },
                { num: '40%', label: 'Below market price' },
                { num: '10k+', label: 'Happy families' },
                { num: '5★', label: 'Customer rating' },
              ].map(stat => (
                <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
                  <div className="text-3xl font-black text-white mb-1">{stat.num}</div>
                  <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 text-xs text-gray-500">
              <span>🚀 Free delivery on orders above ₹499</span>
              <span>✅ BIS certified safe toys</span>
              <span>💰 Best prices guaranteed</span>
              <span>📞 Call before you pay — +91 9999155976</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold tracking-wider uppercase mb-4 text-brand-primary">Our Categories</h2>
          <div className="h-[1px] w-16 sm:w-24 bg-brand-accent mx-auto"></div>
        </div>

        {loadingCats ? (
          <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-accent"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => (
              <Link key={category._id} to={`/category/${category._id}`} className="group relative overflow-hidden block h-72 sm:h-[450px] rounded-lg">
                <img 
                  src={getImageUrl(category.image)} 
                  alt={category.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay on hover for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 text-center px-4">
                  <h3 className="text-white text-xl sm:text-2xl font-sans font-semibold tracking-widest uppercase">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products / Best Sellers */}
      <section className="bg-brand-secondary py-16 sm:py-24">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold tracking-wider uppercase mb-4 text-brand-primary">New Arrivals</h2>
            <div className="h-[1px] w-16 sm:w-24 bg-brand-accent mx-auto"></div>
          </div>

          {loadingProds ? (
            <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-accent"></div></div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {products.slice(0, 4).map((product) => (
                <Link key={product._id} to={`/product/${product._id}`} className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="relative h-64 sm:h-80 overflow-hidden bg-white">
                    <img 
                      src={getImageUrl(product.images[0])} 
                      alt={product.name} 
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 p-4"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-black px-2 py-1 rounded-full">
                        SALE
                      </div>
                    )}
                  </div>
                  <div className="text-center p-4 border-t border-gray-100">
                    <h3 className="text-sm sm:text-base uppercase tracking-widest text-brand-text mb-2 font-semibold truncate">{product.name}</h3>
                    {product.originalPrice ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-400 text-sm line-through">₹{product.originalPrice.toLocaleString()}</span>
                        <span className="text-pink-600 font-black text-lg">₹{product.price.toLocaleString()}</span>
                      </div>
                    ) : (
                      <p className="text-brand-accent font-sans font-bold text-lg">₹{product.price.toLocaleString()}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 font-light tracking-wide py-10 px-4">
              Our curated collection is being updated. Please check back soon.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
