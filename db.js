import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// Create SQLite database connection
const dbPromise = open({
  filename: './condo_management.db',
  driver: sqlite3.Database
})

// Initialize database with schema
async function initializeDb() {
  const db = await dbPromise
  
  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      role TEXT DEFAULT 'resident',
      unit_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS units (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      unit_number TEXT UNIQUE NOT NULL,
      type TEXT,
      floor INTEGER,
      status TEXT DEFAULT 'available',
      price REAL DEFAULT 0,
      area REAL DEFAULT 0,
      tenant TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS facilities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      capacity INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      facility_id INTEGER,
      date TEXT,
      time_slot TEXT,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (facility_id) REFERENCES facilities(id)
    );

    CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      visitor_name TEXT NOT NULL,
      visitor_email TEXT,
      visitor_phone TEXT,
      visit_date TEXT,
      visit_time TEXT,
      purpose TEXT,
      unit_number TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender_id INTEGER NOT NULL,
      receiver_id INTEGER,
      subject TEXT,
      content TEXT,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (sender_id) REFERENCES users(id),
      FOREIGN KEY (receiver_id) REFERENCES users(id)
    );
  `)

  // Insert some sample units if none exist
  const unitCount = await db.get('SELECT COUNT(*) as count FROM units')
  if (unitCount.count === 0) {
    await db.run(`
      INSERT INTO units (unit_number, type, floor, status, price, area) VALUES
      ('101', '1BR', 1, 'available', 15000, 45.5),
      ('102', '1BR', 1, 'occupied', 15000, 45.5),
      ('201', '2BR', 2, 'available', 22000, 65.0),
      ('202', '2BR', 2, 'maintenance', 22000, 65.0),
      ('301', '3BR', 3, 'available', 30000, 85.0),
      ('302', '3BR', 3, 'occupied', 30000, 85.0)
    `)
  }

  // Insert sample admin user if none exists
  const adminCount = await db.get('SELECT COUNT(*) as count FROM users WHERE role = "admin"')
  if (adminCount.count === 0) {
    await db.run(`
      INSERT INTO users (email, password, name, role) VALUES
      ('admin@condo.com', '$2a$10$NpUhIzQK1ss7zLeRwy6Cy.CfzqjLCBb1xLaobDO/0bmmcNkOiQjhy', 'Admin User', 'admin'),
      ('resident@condo.com', '$2a$10$NpUhIzQK1ss7zLeRwy6Cy.CfzqjLCBb1xLaobDO/0bmmcNkOiQjhy', 'Resident User', 'resident')
    `)
  }

  return db
}

// Export the database promise
export default await initializeDb()
