import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'
import bookingsRoutes from './routes/bookings.js'
import unitsRoutes from './routes/units.js'
import visitsRoutes from './routes/visits.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: true, // Allow all origins temporarily
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/bookings', bookingsRoutes)
app.use('/api/units', unitsRoutes)
app.use('/api/visits', visitsRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend running' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
