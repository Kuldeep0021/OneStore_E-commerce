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
      {/* Hero Section — Logo & Subtitle */}
      <section className="bg-white w-full min-h-[60vh] flex items-center justify-center pt-8 pb-12 border-b border-gray-100">
        <div className="text-center">
          <img src="/logo.png" alt="GiggleToyz" className="h-48 sm:h-64 md:h-80 w-auto object-contain mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black tracking-tight">
            Online store for Toys
          </h2>
          <div className="mt-8 h-[2px] w-40 sm:w-56 bg-brand-accent mx-auto"></div>
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {categories.map((category) => (
              <Link key={category._id} to={`/category/${category._id}`} className="group relative overflow-hidden block aspect-[4/5] sm:aspect-auto sm:h-[450px] rounded-xl sm:rounded-2xl">
                <img 
                  src={getImageUrl(category.image)} 
                  alt={category.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-3 sm:bottom-6 left-0 right-0 flex justify-center px-2">
                  <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 sm:px-6 sm:py-2 max-w-[90%]">
                    <h3 className="text-white text-xs sm:text-lg font-sans font-medium tracking-wider truncate">{category.name}</h3>
                  </div>
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
