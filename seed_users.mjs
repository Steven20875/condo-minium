import pool from './db.js'
import bcrypt from 'bcryptjs'

const resetPasswords = async () => {
  try {
    const adminHash = await bcrypt.hash('admin123', 10)
    const residentHash = await bcrypt.hash('resident123', 10)

    await pool.query('UPDATE users SET password = ? WHERE email = ?', [adminHash, 'admin@condo.com'])
    await pool.query('UPDATE users SET password = ? WHERE email = ?', [residentHash, 'resident@condo.com'])

    const [rows] = await pool.query('SELECT id, email, password, CHAR_LENGTH(password) AS len FROM users')
    console.table(rows)

    console.log('Passwords reset for admin@condo.com and resident@condo.com')
  } catch (err) {
    console.error('Seed error:', err)
  } finally {
    await pool.end()
  }
}

resetPasswords()
