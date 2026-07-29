import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

async function seed() {
  try {
    // 1. Login as admin
    console.log('🔐 Logging in as admin...');
    const loginRes = await api.post('/auth/login', {
      email: 'admin@onestore.com',
      password: 'Admin@123'
    });
    const token = loginRes.data.token;
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    console.log('✅ Logged in!');

    // 2. Create Categories
    console.log('\n📦 Creating categories...');
    const categoryData = [
      { name: 'Toys & Games',        description: 'Fun toys and games for all ages', image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800' },
      { name: 'Electronics',         description: 'Gadgets, accessories and more',    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800' },
      { name: 'Fashion',             description: 'Clothing, footwear and accessories', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800' },
      { name: 'Home & Kitchen',      description: 'Everything for your home',          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800' },
    ];

    const categories = {};
    for (const cat of categoryData) {
      try {
        const res = await api.post('/categories', cat, auth);
        categories[cat.name] = res.data._id;
        console.log(`  ✅ Created: ${cat.name}`);
      } catch (e) {
        // May already exist — fetch
        const existing = await api.get('/categories');
        const found = existing.data.find(c => c.name === cat.name);
        if (found) {
          categories[cat.name] = found._id;
          console.log(`  ℹ️  Already exists: ${cat.name}`);
        }
      }
    }

    // 3. Create Products
    console.log('\n🛍️  Creating products...');
    const products = [
      // Toys & Games
      {
        name: 'Remote Control Racing Car',
        description: 'High-speed RC car with 2.4GHz control, rechargeable battery, and shock absorbers. Speeds up to 30km/h. Perfect for kids aged 6+.',
        price: 899,
        originalPrice: 1499,
        originalPriceBase: 'Price on Amazon & Flipkart',
        images: ['https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600'],
        category: categories['Toys & Games'],
        stockQuantity: 50,
        isActive: true
      },
      {
        name: 'LEGO Classic Brick Set (500 pcs)',
        description: 'Classic LEGO bricks with 500 pieces in 33 colors. Stimulates creativity and imagination. Compatible with all LEGO sets. Age 4+.',
        price: 1299,
        originalPrice: 1999,
        originalPriceBase: 'MRP / Market Price',
        images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600'],
        category: categories['Toys & Games'],
        stockQuantity: 30,
        isActive: true
      },
      {
        name: 'Wooden Puzzle Set — Animals',
        description: 'Beautiful hand-painted wooden animal puzzles (12 puzzles, 3–8 pieces each). Safe, non-toxic colors. Ages 2–5. Builds problem-solving skills.',
        price: 399,
        originalPrice: 699,
        originalPriceBase: 'Price on Leading Marketplaces',
        images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600'],
        category: categories['Toys & Games'],
        stockQuantity: 80,
        isActive: true
      },
      {
        name: 'Magnetic Drawing Board',
        description: 'Mess-free drawing board with magnetic stylus and stamps. No ink, no mess — just draw and erase! Great for travel. Age 3+.',
        price: 349,
        originalPrice: 599,
        originalPriceBase: 'MRP',
        images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600'],
        category: categories['Toys & Games'],
        stockQuantity: 60,
        isActive: true
      },

      // Electronics
      {
        name: 'Wireless Earbuds Pro',
        description: 'Bluetooth 5.3 true wireless earbuds with 30hr battery, active noise cancellation, and IPX5 water resistance. Compatible with all devices.',
        price: 1499,
        originalPrice: 2999,
        originalPriceBase: 'Price on Amazon',
        images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600'],
        category: categories['Electronics'],
        stockQuantity: 40,
        isActive: true
      },
      {
        name: 'Smart LED Desk Lamp',
        description: 'Touch-control LED desk lamp with 5 brightness levels, USB charging port, and eye-care mode. Perfect for studying and work.',
        price: 799,
        originalPrice: 1299,
        originalPriceBase: 'MRP / Market Price',
        images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'],
        category: categories['Electronics'],
        stockQuantity: 35,
        isActive: true
      },
      {
        name: 'Phone Stand & Holder',
        description: 'Adjustable aluminum phone stand with 360° rotation. Compatible with all phones and tablets. Anti-slip base. Great for video calls and watching.',
        price: 299,
        originalPrice: 499,
        originalPriceBase: 'Price on Flipkart',
        images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600'],
        category: categories['Electronics'],
        stockQuantity: 100,
        isActive: true
      },

      // Fashion
      {
        name: 'Classic Canvas Backpack',
        description: 'Durable canvas backpack with 20L capacity, laptop sleeve (fits 15"), water bottle pockets, and ergonomic padded straps. Multiple colors.',
        price: 699,
        originalPrice: 1199,
        originalPriceBase: 'Brand MRP',
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600'],
        category: categories['Fashion'],
        stockQuantity: 45,
        isActive: true
      },
      {
        name: 'Casual Cotton T-Shirt (Pack of 3)',
        description: '100% premium cotton t-shirts in a pack of 3. Pre-shrunk fabric, ribbed collar. Available in S/M/L/XL. Comfortable all-day wear.',
        price: 499,
        originalPrice: 899,
        originalPriceBase: 'MRP per pack',
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'],
        category: categories['Fashion'],
        stockQuantity: 120,
        isActive: true
      },

      // Home & Kitchen
      {
        name: 'Stainless Steel Water Bottle (1L)',
        description: 'Double-walled vacuum insulated 1L water bottle. Keeps drinks cold 24hrs / hot 12hrs. BPA free. Leak-proof lid. Fits cup holders.',
        price: 449,
        originalPrice: 799,
        originalPriceBase: 'MRP / Amazon Price',
        images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600'],
        category: categories['Home & Kitchen'],
        stockQuantity: 75,
        isActive: true
      },
      {
        name: 'Non-Stick Cookware Set (3 pcs)',
        description: 'Premium granite-coated non-stick cookware set: 18cm, 22cm, 26cm pans. PFOA-free. Induction compatible. Includes glass lids. Easy to clean.',
        price: 1199,
        originalPrice: 2199,
        originalPriceBase: 'Price on Leading Marketplaces',
        images: ['https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=600'],
        category: categories['Home & Kitchen'],
        stockQuantity: 25,
        isActive: true
      },
      {
        name: 'Airtight Food Storage Set (6 pcs)',
        description: '6-piece BPA-free airtight food containers in various sizes. Microwave and dishwasher safe. Stack easily to save space. Keeps food fresh longer.',
        price: 349,
        originalPrice: 599,
        originalPriceBase: 'MRP',
        images: ['https://images.unsplash.com/photo-1611735341450-74d61e660ad2?w=600'],
        category: categories['Home & Kitchen'],
        stockQuantity: 90,
        isActive: true
      },
    ];

    for (const prod of products) {
      try {
        await api.post('/products', prod, auth);
        console.log(`  ✅ ${prod.name} — ₹${prod.price} (was ₹${prod.originalPrice})`);
      } catch (e) {
        console.log(`  ⚠️  Skipped (may exist): ${prod.name}`);
      }
    }

    console.log('\n🎉 Done! All categories and products seeded successfully.');
    console.log('   Open http://localhost:5173 to see the store.\n');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

seed();
