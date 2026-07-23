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
      <section className="relative bg-gradient-to-r from-gray-900 to-black py-24 sm:py-32 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold text-white tracking-tight mb-4 sm:mb-6 leading-tight">
            Welcome to OneStore
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
            Your one-stop shop for everything! Discover amazing deals on fresh groceries, electronics, books, and daily essentials.
          </p>
          <a 
            href="#categories" 
            className="inline-block bg-white text-black font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-200 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            Start Shopping
          </a>
        </div>
        
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-24 -left-24 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute top-32 right-[-2rem] sm:right-12 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white blur-3xl"></div>
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
                  </div>
                  <div className="text-center p-4 border-t border-gray-100">
                    <h3 className="text-sm sm:text-base uppercase tracking-widest text-brand-text mb-2 font-semibold truncate">{product.name}</h3>
                    <p className="text-brand-accent font-sans font-bold text-lg">₹{product.price.toLocaleString()}</p>
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
