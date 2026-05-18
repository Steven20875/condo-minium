import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const bookings = await db.all('SELECT * FROM bookings')
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: 'Could not load bookings', error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { user_id, facility_id, date, time_slot, status } = req.body
    const result = await db.run(
      'INSERT INTO bookings (user_id, facility_id, date, time_slot, status) VALUES (?, ?, ?, ?, ?)',
      user_id,
      facility_id,
      date,
      time_slot,
      status || 'pending'
    )
    const booking = await db.get('SELECT * FROM bookings WHERE id = ?', result.lastID)
    res.status(201).json(booking)
  } catch (error) {
    res.status(500).json({ message: 'Could not create booking', error: error.message })
  }
})

export default router
