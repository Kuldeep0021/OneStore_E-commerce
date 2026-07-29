import { useState, useEffect, useRef } from 'react';
import { Pencil, Trash2, Plus, UploadCloud, X } from 'lucide-react';
import api from '../../api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    originalPriceBase: 'Price on Leading Marketplaces',
    category: '',
    stockQuantity: '',
    isActive: true
  });
  
  // Existing images (urls)
  const [existingImages, setExistingImages] = useState([]);
  // New files to upload
  const [newFiles, setNewFiles] = useState([]);
  // Previews for new files
  const [newPreviews, setNewPreviews] = useState([]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products/all');
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice || '',
        originalPriceBase: product.originalPriceBase || 'Price on Leading Marketplaces',
        category: product.category?._id || '',
        stockQuantity: product.stockQuantity,
        isActive: product.isActive
      });
      setExistingImages(product.images || []);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '', description: '', price: '', originalPrice: '', originalPriceBase: 'Price on Leading Marketplaces', category: categories[0]?._id || '', stockQuantity: 10, isActive: true
      });
      setExistingImages([]);
    }
    setNewFiles([]);
    setNewPreviews([]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    addFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    addFiles(files);
  };

  const addFiles = (files) => {
    setNewFiles(prev => [...prev, ...files]);
    const previews = files.map(file => URL.createObjectURL(file));
    setNewPreviews(prev => [...prev, ...previews]);
  };

  const removeNewImage = (index) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
    setNewPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let uploadedPaths = [];
      
      if (newFiles.length > 0) {
        const formDataUpload = new FormData();
        newFiles.forEach(file => formDataUpload.append('images', file));
        const uploadRes = await api.post('/upload', formDataUpload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        uploadedPaths = uploadRes.data.paths;
      }

      const finalImages = [...existingImages, ...uploadedPaths];
      
      const payload = { 
        ...formData, 
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        originalPriceBase: formData.originalPriceBase || '',
        stockQuantity: Number(formData.stockQuantity),
        images: finalImages 
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, payload);
      } else {
        await api.post('/products', payload);
      }
      
      fetchProducts();
      closeModal();
      alert('Product saved successfully!');
    } catch (error) {
      console.error('Error saving product', error);
      alert('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product', error);
      }
    }
  };

  const handleLivePriceUpdate = async (product, newPrice) => {
    if (!newPrice || isNaN(newPrice) || Number(newPrice) <= 0) return;
    try {
      await api.put(`/products/${product._id}`, { price: Number(newPrice) });
      fetchProducts(); // Refresh list to show updated price
      alert('Price updated live!');
    } catch (error) {
      alert('Failed to update price');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Products</h2>
        <button onClick={() => openModal()} className="btn-primary flex items-center px-4 py-2 text-sm">
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {products.map((product) => (
            <li key={product._id}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <img className="h-12 w-12 rounded-md object-cover" 
                         src={product.images && product.images[0] ? (product.images[0].startsWith('http') ? product.images[0] : `http://localhost:5000${product.images[0]}`) : 'placeholder'} 
                         alt="" />
                    <div className="ml-4 flex-shrink-0">
                      <p className="font-medium text-gray-900 truncate">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category?.name}</p>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0 flex items-center space-x-6">
                  {/* Live Price Editor */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">₹</span>
                    <input 
                      type="number" 
                      defaultValue={product.price}
                      onBlur={(e) => {
                        if(Number(e.target.value) !== product.price) {
                          handleLivePriceUpdate(product, e.target.value);
                        }
                      }}
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Stock: {product.stockQuantity}</span>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <button onClick={() => openModal(product)} className="text-gray-400 hover:text-blue-500">
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[80vh] overflow-y-auto">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="mt-1 input-field" required />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="mt-1 input-field" required></textarea>
                    </div>
                    {/* Price Section */}
                    <div className="sm:col-span-2 bg-blue-50 border border-blue-100 rounded-lg p-4">
                      <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">💰 Pricing — GiggleToyz vs Market</p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Original Price (MRP / Market)</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                            <input type="number" value={formData.originalPrice} onChange={(e) => setFormData({...formData, originalPrice: e.target.value})} className="mt-1 input-field pl-7" min="0" placeholder="e.g. 1499" />
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Shown crossed-out on product page</p>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Original Price Label</label>
                          <input type="text" value={formData.originalPriceBase} onChange={(e) => setFormData({...formData, originalPriceBase: e.target.value})} className="mt-1 input-field" placeholder="Price on Leading Marketplaces" />
                          <p className="text-xs text-gray-400 mt-1">Label below the market price</p>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-pink-600 uppercase tracking-wider mb-1">⭐ Our Price (GiggleToyz)</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 font-bold">₹</span>
                            <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="mt-1 input-field pl-7 border-pink-300 focus:border-pink-500" min="1" required placeholder="e.g. 899" />
                          </div>
                          <p className="text-xs text-pink-400 mt-1">The price customers pay ✓</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="mt-1 input-field" required>
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                      <input type="number" value={formData.stockQuantity} onChange={(e) => setFormData({...formData, stockQuantity: e.target.value})} className="mt-1 input-field" min="0" required />
                    </div>
                    <div className="flex items-center mt-6">
                      <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="h-4 w-4 text-brand-primary focus:ring-brand-accent border-gray-300 rounded" />
                      <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">Active (Visible on store)</label>
                    </div>
                    
                    {/* Image Upload Area */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Images (Drag & Drop or Click)</label>
                      <div 
                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-brand-accent"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="space-y-1 text-center">
                          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600 justify-center">
                            <span className="relative cursor-pointer bg-white rounded-md font-medium text-brand-accent hover:text-brand-primary">
                              <span>Upload files</span>
                              <input ref={fileInputRef} type="file" className="sr-only" onChange={handleFileChange} accept="image/*" multiple />
                            </span>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                        </div>
                      </div>

                      {/* Previews */}
                      {(existingImages.length > 0 || newPreviews.length > 0) && (
                        <div className="mt-4 grid grid-cols-4 gap-4">
                          {existingImages.map((img, idx) => (
                            <div key={`ext-${idx}`} className="relative group">
                              <img src={img.startsWith('http') ? img : `http://localhost:5000${img}`} alt="" className="h-24 w-full object-cover rounded-md" />
                              <button type="button" onClick={() => removeExistingImage(idx)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          {newPreviews.map((img, idx) => (
                            <div key={`new-${idx}`} className="relative group">
                              <img src={img} alt="" className="h-24 w-full object-cover rounded-md border-2 border-green-400" />
                              <button type="button" onClick={() => removeNewImage(idx)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" disabled={loading} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-primary text-base font-medium text-white hover:bg-black sm:ml-3 sm:w-auto sm:text-sm">
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button type="button" onClick={closeModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
