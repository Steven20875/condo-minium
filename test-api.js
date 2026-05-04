import fetch from 'node-fetch';

async function testBackend() {
  try {
    console.log('Testing backend health...');
    const healthResponse = await fetch('http://localhost:5000/api/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);

    console.log('Testing login...');
    const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@condo.com',
        password: 'admin123'
      })
    });

    const loginData = await loginResponse.json();
    console.log('✅ Login response:', loginData);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testBackend();