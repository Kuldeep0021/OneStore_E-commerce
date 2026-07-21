import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-luora-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 text-center md:text-left z-10">
            <h1 className="text-4xl md:text-6xl font-serif text-luora-primary">Elegance in Every Detail.</h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto md:mx-0">
              Discover our exclusive collection of fine jewellery crafted to perfection.
            </p>
            <div className="pt-4">
              <a href="#categories" className="btn-primary inline-block">Explore Collection</a>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative">
            <img 
              src="https://images.unsplash.com/photo-1599643478524-fb66f70362f6?q=80&w=1200&auto=format&fit=crop" 
              alt="Hero Jewellery" 
              className="rounded-lg shadow-2xl object-cover h-[500px] w-full"
            />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif mb-4">Shop by Category</h2>
          <div className="h-1 w-20 bg-luora-accent mx-auto"></div>
        </div>

        {loading ? (
          <div className="flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luora-accent"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link key={category._id} to={`/category/${category._id}`} className="group relative overflow-hidden rounded-lg block h-80">
                <img 
                  src={category.image.startsWith('http') ? category.image : `http://localhost:5000${category.image}`} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 group-hover:bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-serif tracking-widest uppercase text-center px-4">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
