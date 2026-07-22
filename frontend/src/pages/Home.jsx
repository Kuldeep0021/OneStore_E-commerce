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
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-32 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-sans font-bold text-white tracking-tight mb-6">
            Welcome to OneStore
          </h1>
          <p className="text-xl text-blue-100 font-light tracking-wide max-w-2xl mx-auto mb-10">
            Your one-stop shop for everything! Discover amazing deals on fresh groceries, electronics, books, and daily essentials.
          </p>
          <a 
            href="#categories" 
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300"
          >
            Start Shopping
          </a>
        </div>
        
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute top-32 right-12 w-64 h-64 rounded-full bg-white blur-3xl"></div>
        </div>
      </div>

      {/* Categories Section */}
      <div id="categories" className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif tracking-wider uppercase mb-4">Our Categories</h2>
          <div className="h-[1px] w-24 bg-brand-accent mx-auto"></div>
        </div>

        {loadingCats ? (
          <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-accent"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category._id} to={`/category/${category._id}`} className="group relative overflow-hidden block h-[450px]">
                <img 
                  src={getImageUrl(category.image)} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay on hover for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <h3 className="text-white text-2xl font-serif tracking-[0.15em] uppercase">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Featured Products / Best Sellers */}
      <div className="bg-brand-secondary py-24">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif tracking-wider uppercase mb-4">New Arrivals</h2>
            <div className="h-[1px] w-24 bg-brand-accent mx-auto"></div>
          </div>

          {loadingProds ? (
            <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-accent"></div></div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.slice(0, 4).map((product) => (
                <Link key={product._id} to={`/product/${product._id}`} className="group block">
                  <div className="relative h-80 overflow-hidden mb-4 bg-white">
                    <img 
                      src={getImageUrl(product.images[0])} 
                      alt={product.name} 
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 p-4"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm uppercase tracking-widest text-brand-text mb-2 font-medium">{product.name}</h3>
                    <p className="text-brand-accent font-serif italic text-lg">₹{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 font-light tracking-wide py-10">
              Our curated collection is being updated. Please check back soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
