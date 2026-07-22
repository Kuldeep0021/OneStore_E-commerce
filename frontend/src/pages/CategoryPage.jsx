import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import api, { getImageUrl } from '../api';

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [sort, setSort] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await api.get('/categories');
        const cat = data.find(c => c._id === id);
        setCategory(cat);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategory();
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = { category: id, sort };
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        
        const { data } = await api.get('/products', { params });
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Add a small debounce for typing prices
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [id, sort, minPrice, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif mb-4 uppercase tracking-wider text-luora-primary">{category?.name || 'Category'}</h1>
        <div className="h-[1px] w-24 bg-luora-accent mx-auto"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="flex items-center mb-6 text-luora-primary">
            <Filter className="w-5 h-5 mr-2" />
            <h2 className="text-lg font-serif uppercase tracking-widest">Filter</h2>
          </div>
          
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Sort By</h3>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="w-full border border-gray-300 p-3 font-light text-sm focus:border-luora-accent focus:outline-none"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Price Range</h3>
            <div className="flex gap-4 mb-4">
              <input 
                type="number" 
                placeholder="Min ₹" 
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full border border-gray-300 p-2 font-light text-sm focus:border-luora-accent focus:outline-none"
              />
              <input 
                type="number" 
                placeholder="Max ₹" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full border border-gray-300 p-2 font-light text-sm focus:border-luora-accent focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
             <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-luora-accent"></div></div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500 py-12 font-light">No products match your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`} className="group block">
                  <div className="aspect-w-3 aspect-h-4 bg-gray-50 relative overflow-hidden mb-4 h-80">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={getImageUrl(product.images[0])}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 font-light">No Image</div>
                    )}
                  </div>
                  <div className="text-center px-2">
                    <h3 className="text-xs uppercase tracking-widest text-luora-text mb-2 font-medium truncate">{product.name}</h3>
                    <p className="text-luora-accent font-serif italic text-lg">₹{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
