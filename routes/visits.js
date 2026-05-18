import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const visits = await db.all('SELECT * FROM visits')
    res.json(visits)
  } catch (error) {
    res.status(500).json({ message: 'Could not load visits', error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { visitor_name, visitor_email, visitor_phone, visit_date, visit_time, purpose, unit_number, status } = req.body
    const result = await db.run(
      'INSERT INTO visits (visitor_name, visitor_email, visitor_phone, visit_date, visit_time, purpose, unit_number, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      visitor_name,
      visitor_email,
      visitor_phone,
      visit_date,
      visit_time,
      purpose,
      unit_number,
      status || 'pending'
    )
    const visit = await db.get('SELECT * FROM visits WHERE id = ?', result.lastID)
    res.status(201).json(visit)
  } catch (error) {
    res.status(500).json({ message: 'Could not create visit', error: error.message })
  }
})

export default router
