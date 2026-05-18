import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role, unit_id } = req.body
    const existing = await db.get('SELECT id FROM users WHERE email = ?', email)
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    const hashed = await bcrypt.hash(password, 10)
    const result = await db.run(
      'INSERT INTO users (email, password, name, role, unit_id) VALUES (?, ?, ?, ?, ?)',
      email,
      hashed,
      name || null,
      role || 'resident',
      unit_id || null
    )

    res.status(201).json({ id: result.lastID, email, name, role, unit_id })
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await db.get('SELECT * FROM users WHERE email = ?', email)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '8h' }
    )

    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role, unit_id: user.unit_id } })
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message })
  }
})

export default router
