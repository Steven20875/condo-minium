import pool from './db.js';

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    const connection = await pool.getConnection();
    console.log('✅ Connected to database');

    const [rows] = await connection.query('SELECT COUNT(*) as count FROM users');
    console.log('✅ Users table has', rows[0].count, 'records');

    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database error:', error.code || error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

testDatabase();