import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        
        const cat = categoriesRes.data.find(c => c._id === id);
        setCategory(cat);
        
        const filteredProducts = productsRes.data.filter(p => p.category._id === id);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luora-accent"></div></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif mb-4">{category?.name || 'Category'}</h1>
        <div className="h-1 w-20 bg-luora-accent mx-auto"></div>
      </div>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No products found in this category.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`} className="group block">
              <div className="aspect-w-3 aspect-h-4 bg-gray-200 rounded-lg overflow-hidden relative">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0].startsWith('http') ? product.images[0] : `http://localhost:5000${product.images[0]}`}
                    alt={product.name}
                    className="w-full h-80 object-cover object-center group-hover:opacity-75 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-80 flex items-center justify-center bg-gray-100">No Image</div>
                )}
                {product.stockQuantity === 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Out of Stock</div>
                )}
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 font-medium">{product.name}</h3>
                </div>
                <p className="text-sm font-medium text-gray-900">₹{product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
