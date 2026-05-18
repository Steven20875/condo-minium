import express from 'express'
import bcrypt from 'bcryptjs'
import db from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await db.all('SELECT id, email, name, role, unit_id, created_at, updated_at FROM users')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Could not load users', error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await db.get('SELECT id, email, name, role, unit_id, created_at, updated_at FROM users WHERE id = ?', req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Could not load user', error: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { name, role, unit_id } = req.body
    await db.run('UPDATE users SET name = ?, role = ?, unit_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', name, role, unit_id, req.params.id)
    const updated = await db.get('SELECT id, email, name, role, unit_id, created_at, updated_at FROM users WHERE id = ?', req.params.id)
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: 'Could not update user', error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM users WHERE id = ?', req.params.id)
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Could not delete user', error: error.message })
  }
})

export default router
