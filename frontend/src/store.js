import { create } from 'zustand';

export const useStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  
  setUser: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token });
  },
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  addToCart: (product, quantity = 1) => {
    const { cart } = get();
    const existingItem = cart.find(item => item.product._id === product._id);
    let newCart;
    if (existingItem) {
      newCart = cart.map(item => 
        item.product._id === product._id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, { product, quantity }];
    }
    localStorage.setItem('cart', JSON.stringify(newCart));
    set({ cart: newCart });
  },

  updateQuantity: (productId, delta) => {
    const { cart } = get();
    const newCart = cart.map(item => {
      if (item.product._id === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    set({ cart: newCart });
  },

  removeFromCart: (productId) => {
    const { cart } = get();
    const newCart = cart.filter(item => item.product._id !== productId);
    localStorage.setItem('cart', JSON.stringify(newCart));
    set({ cart: newCart });
  },

  clearCart: () => {
    localStorage.removeItem('cart');
    set({ cart: [] });
  },

  cartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}));
