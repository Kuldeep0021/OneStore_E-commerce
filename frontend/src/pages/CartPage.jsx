import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useStore } from '../store';
import { getImageUrl } from '../api';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useStore();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-serif mb-8 text-center">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-6">Your cart is currently empty.</p>
          <Link to="/" className="btn-primary inline-block">Continue Shopping</Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-8">
            <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cart.filter(item => item && item.product).map((item) => (
                <li key={item.product._id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.images && item.product.images[0] ? getImageUrl(item.product.images[0]) : 'placeholder.jpg'}
                      alt={item.product.name}
                      className="w-24 h-24 rounded-md object-cover sm:w-32 sm:h-32"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link to={`/product/${item.product._id}`} className="font-medium text-gray-700 hover:text-gray-800">
                              {item.product.name}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">₹{item.product.price.toLocaleString()}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9 flex items-center">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button onClick={() => updateQuantity(item.product._id, -1)} className="p-2 text-gray-600 hover:text-brand-primary">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 text-gray-700">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product._id, 1)} className="p-2 text-gray-600 hover:text-brand-primary" disabled={item.quantity >= item.product.stockQuantity}>
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="absolute top-0 right-0 sm:top-auto sm:right-auto sm:ml-6">
                          <button onClick={() => removeFromCart(item.product._id)} type="button" className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500">
                            <span className="sr-only">Remove</span>
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-4 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order summary</h2>
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">₹{cartTotal().toLocaleString()}</dd>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <dt className="text-sm text-gray-600">Shipping</dt>
              <dd className="text-sm font-medium text-gray-900">Free</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-base font-medium text-gray-900">Order total</dt>
              <dd className="text-base font-medium text-gray-900">₹{cartTotal().toLocaleString()}</dd>
            </div>

            <div className="mt-6">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
