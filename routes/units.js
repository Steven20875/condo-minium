import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const units = await db.all('SELECT * FROM units')
    res.json(units)
  } catch (error) {
    res.status(500).json({ message: 'Could not load units', error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const unit = await db.get('SELECT * FROM units WHERE id = ?', req.params.id)
    if (!unit) return res.status(404).json({ message: 'Unit not found' })
    res.json(unit)
  } catch (error) {
    res.status(500).json({ message: 'Could not load unit', error: error.message })
  }
})

export default router
