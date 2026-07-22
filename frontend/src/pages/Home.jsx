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
      <div className="relative h-screen min-h-[600px] w-full">
        <div className="absolute inset-0">
          <img 
            src="/hero.jpg" 
            alt="Hero Jewellery" 
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay to make text pop */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-wide mb-6">
            Elegance in Every Detail
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-light tracking-wider max-w-2xl mb-10">
            Discover our curated collection of fine jewellery. Timeless pieces crafted for the modern woman.
          </p>
          <a 
            href="#categories" 
            className="bg-transparent border border-white text-white px-10 py-4 uppercase tracking-widest text-sm hover:bg-white hover:text-luora-primary transition-colors duration-300"
          >
            Explore Collection
          </a>
        </div>
      </div>

      {/* Categories Section */}
      <div id="categories" className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif tracking-wider uppercase mb-4">Our Categories</h2>
          <div className="h-[1px] w-24 bg-luora-accent mx-auto"></div>
        </div>

        {loadingCats ? (
          <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-luora-accent"></div></div>
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
      <div className="bg-luora-secondary py-24">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif tracking-wider uppercase mb-4">New Arrivals</h2>
            <div className="h-[1px] w-24 bg-luora-accent mx-auto"></div>
          </div>

          {loadingProds ? (
            <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-luora-accent"></div></div>
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
                    <h3 className="text-sm uppercase tracking-widest text-luora-text mb-2 font-medium">{product.name}</h3>
                    <p className="text-luora-accent font-serif italic text-lg">₹{product.price.toLocaleString()}</p>
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
