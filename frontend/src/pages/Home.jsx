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
      {/* Full-width Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-600 via-rose-500 to-pink-500 py-20 sm:py-28 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block bg-white/10 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/20">
            🎉 India's Best Toy Store
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-4 leading-tight">
            Giggle<span className="text-yellow-300">Toyz</span> <span className="text-3xl sm:text-4xl">🌟</span>
          </h1>
          <p className="text-lg sm:text-xl text-pink-100 font-light max-w-2xl mx-auto mb-3">
            Fun, Safe & Affordable Toys for Every Child
          </p>
          <p className="text-sm sm:text-base text-pink-200 font-light max-w-xl mx-auto mb-10">
            Discover an amazing range of educational toys, games & gifts — at prices that beat every marketplace!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#categories"
              className="inline-block bg-white text-pink-600 font-black px-8 py-4 rounded-full shadow-lg hover:bg-pink-50 hover:scale-105 transition-all duration-300 w-full sm:w-auto text-sm uppercase tracking-widest"
            >
              Shop Now
            </a>
            <a
              href="https://wa.me/919999155976"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300 w-full sm:w-auto text-sm uppercase tracking-widest"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-24 -left-24 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute top-32 right-[-2rem] sm:right-12 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-yellow-300 blur-3xl"></div>
          <div className="absolute -bottom-16 left-1/2 w-64 h-64 rounded-full bg-white blur-3xl"></div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { icon: '🚀', label: 'Fast Delivery', sub: 'Pan India' },
              { icon: '✅', label: '100% Safe', sub: 'BIS Certified Toys' },
              { icon: '💰', label: 'Best Prices', sub: 'Beat Any Marketplace' },
              { icon: '📞', label: '24/7 Support', sub: 'Call & WhatsApp' },
            ].map(badge => (
              <div key={badge.label} className="py-3 px-2">
                <div className="text-2xl mb-1">{badge.icon}</div>
                <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">{badge.label}</p>
                <p className="text-xs text-gray-400 font-light">{badge.sub}</p>
              </div>
            ))}
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
