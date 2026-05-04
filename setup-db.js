import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDatabase() {
  let connection;
  try {
    console.log('Connecting to XAMPP MySQL...');
    // First connect without database to create it
    connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '',
      port: 3306,
      multipleStatements: true,
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0
    });
    
    console.log('✅ Connected successfully!');
    
    // Read schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Running schema...');
    // Execute all statements
    await connection.query(schema);
    
    console.log('✅ Database setup complete!');
    console.log('✅ Database: condo_management');
    console.log('✅ Tables created: users, units, facilities, bookings, visits, messages');
    
    await connection.end();
  } catch (error) {
    console.error('❌ Error setting up database:');
    console.error(error.code || error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

setupDatabase();
