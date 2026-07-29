import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter } from 'lucide-react';
import api, { getImageUrl } from '../api';

// Price range presets — min/max of null means "no limit"
const PRICE_RANGES = [
  { label: 'All Prices',    min: null,  max: null  },
  { label: 'Below ₹100',   min: null,  max: 100   },
  { label: '₹100 – ₹200',  min: 100,   max: 200   },
  { label: '₹200 – ₹500',  min: 200,   max: 500   },
  { label: '₹500 – ₹1000', min: 500,   max: 1000  },
  { label: '₹1000+',       min: 1000,  max: null  },
];

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [sort, setSort] = useState('newest');
  const [selectedRange, setSelectedRange] = useState(0); // index into PRICE_RANGES

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
        const range = PRICE_RANGES[selectedRange];
        const params = { category: id, sort };
        if (range.min !== null) params.minPrice = range.min;
        if (range.max !== null) params.maxPrice = range.max;

        const { data } = await api.get('/products', { params });
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id, sort, selectedRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif mb-4 uppercase tracking-wider text-brand-primary">
          {category?.name || 'Category'}
        </h1>
        <div className="h-[1px] w-24 bg-brand-accent mx-auto"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="flex items-center mb-4 sm:mb-6 text-brand-primary">
            <Filter className="w-5 h-5 mr-2" />
            <h2 className="text-lg font-serif uppercase tracking-widest">Filter</h2>
          </div>

          {/* Sort */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-3 sm:mb-4">Sort By</h3>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border border-gray-300 p-3 font-light text-base sm:text-sm focus:border-brand-accent focus:outline-none rounded-md bg-white"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          {/* Price Range — one-click buttons */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-3 sm:mb-4">Price Range</h3>
            <div className="flex flex-col gap-2">
              {PRICE_RANGES.map((range, idx) => (
                <button
                  key={range.label}
                  onClick={() => setSelectedRange(idx)}
                  className={`w-full text-left px-4 py-3 rounded-md border text-sm font-medium transition-colors duration-150
                    ${selectedRange === idx
                      ? 'bg-brand-accent border-brand-accent text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-brand-accent hover:text-brand-accent'
                    }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-accent"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500 py-12 font-light">
              No products match your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="aspect-w-3 aspect-h-4 bg-white relative overflow-hidden h-64 sm:h-80">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={getImageUrl(product.images[0])}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 font-light">
                        No Image
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-black px-2 py-1 rounded-full">
                        SALE
                      </div>
                    )}
                  </div>
                  <div className="text-center p-4 border-t border-gray-100">
                    <h3 className="text-sm sm:text-base uppercase tracking-widest text-brand-text mb-2 font-semibold truncate">
                      {product.name}
                    </h3>
                    {product.originalPrice ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-400 text-sm line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-pink-600 font-black text-lg">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <p className="text-brand-accent font-sans font-bold text-lg">
                        ₹{product.price.toLocaleString()}
                      </p>
                    )}
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
