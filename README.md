# Condominium Management Backend

Express.js + MySQL backend for condominium management system.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create MySQL Database

Open MySQL and run:

```bash
mysql -u root -p < schema.sql
```

Or manually in MySQL client:

```sql
CREATE DATABASE condo_management;
USE condo_management;
-- Copy contents from schema.sql
```

### 3. Configure Environment

Edit `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=condo_management
DB_PORT=3306
JWT_SECRET=your_secret_key
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 4. Start Backend Server

```bash
npm start          # Production
npm run dev        # Development with auto-reload
```

Server runs at: `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/signup` - Create new user account

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user

### Units
- `GET /api/units` - Get all units
- `GET /api/units/:id` - Get unit details
- `POST /api/units` - Create unit (admin)

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/user/:userId` - Get user's bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking status

### Visits
- `GET /api/visits` - Get all visits
- `POST /api/visits` - Register visitor
- `PUT /api/visits/:id/checkin` - Check in visitor
- `PUT /api/visits/:id/checkout` - Check out visitor

## Test Credentials

**Admin:**
- Email: admin@condo.com
- Password: admin123

**Resident:**
- Email: resident@condo.com
- Password: resident123

## Frontend Integration

Update your React app to call these endpoints:

```javascript
const API_URL = 'http://localhost:5000/api'

// Login example
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})

const { token } = await response.json()
localStorage.setItem('token', token)

// Protected requests
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}
```
