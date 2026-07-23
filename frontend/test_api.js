import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

async function runTests() {
  try {
    console.log('Testing Admin Login...');
    const loginRes = await api.post('/auth/login', {
      email: 'admin@onestore.com',
      password: 'Admin@123'
    });
    console.log('Admin login successful. Token:', loginRes.data.token.substring(0, 15) + '...');
    
    const token = loginRes.data.token;
    
    console.log('Testing Create Category...');
    const catRes = await api.post('/categories', {
      name: 'Rings',
      description: 'Beautiful rings',
      image: 'ring.jpg'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Category created:', catRes.data.name);

    console.log('Testing Fetch Categories...');
    const getCatRes = await api.get('/categories');
    console.log('Categories fetched:', getCatRes.data.length);
    
    console.log('All backend API tests passed!');
  } catch (error) {
    console.error('API Test failed:', error.response?.data || error.message);
  }
}

runTests();
