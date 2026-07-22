import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

async function seedProducts() {
  try {
    // 1. Login
    console.log('Logging in as admin...');
    const loginRes = await api.post('/auth/login', {
      email: 'admin@luora.com',
      password: 'Admin@123'
    });
    const token = loginRes.data.token;
    
    // 2. Fetch categories to get one
    console.log('Fetching categories...');
    const catRes = await api.get('/categories');
    let categoryId = catRes.data[0]?._id;
    
    if (!categoryId) {
      console.log('No category found. Creating "Rings" category...');
      const createCat = await api.post('/categories', {
        name: 'Rings',
        description: 'Beautiful rings',
        image: 'ring.jpg'
      }, { headers: { Authorization: `Bearer ${token}` } });
      categoryId = createCat.data._id;
    }

    // 3. Create products
    console.log('Creating products...');
    const productsToCreate = [
      {
        name: "Diamond Eternity Ring",
        description: "A stunning eternity ring crafted with brilliant diamonds.",
        price: 45000,
        images: ["/ring.jpg"],
        category: categoryId,
        stockQuantity: 10
      },
      {
        name: "Gold Solitaire Ring",
        description: "Classic 18k gold solitaire ring for the modern woman.",
        price: 85000,
        images: ["/ring.jpg"],
        category: categoryId,
        stockQuantity: 5
      },
      {
        name: "Platinum Band",
        description: "Sleek and elegant platinum band.",
        price: 35000,
        images: ["/ring.jpg"],
        category: categoryId,
        stockQuantity: 15
      },
      {
        name: "Rose Gold Crown Ring",
        description: "A beautiful crown-shaped ring in rose gold.",
        price: 55000,
        images: ["/ring.jpg"],
        category: categoryId,
        stockQuantity: 8
      }
    ];

    for (const prod of productsToCreate) {
      await api.post('/products', prod, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(`Created product: ${prod.name}`);
    }

    console.log('All products seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error.response?.data || error.message);
  }
}

seedProducts();
