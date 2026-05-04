-- Create database
CREATE DATABASE IF NOT EXISTS condo_management;
USE condo_management;

-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role ENUM('admin', 'resident') DEFAULT 'resident',
  unit_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM;

-- Units table
CREATE TABLE units (
  id INT PRIMARY KEY AUTO_INCREMENT,
  unit_number VARCHAR(50) UNIQUE NOT NULL,
  type VARCHAR(100),
  floor INT,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM;

-- Facilities table
CREATE TABLE facilities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  capacity INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM;

-- Bookings table
CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  facility_id INT,
  date DATE,
  time_slot VARCHAR(50),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (facility_id) REFERENCES facilities(id)
) ENGINE=MyISAM;

-- Visits table
CREATE TABLE visits (
  id INT PRIMARY KEY AUTO_INCREMENT,
  unit_id INT NOT NULL,
  visitor_name VARCHAR(255),
  purpose TEXT,
  expected_date DATE,
  status VARCHAR(50),
  checked_in_at TIMESTAMP NULL,
  checked_out_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (unit_id) REFERENCES units(id)
) ENGINE=MyISAM;

-- Messages table
CREATE TABLE messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  subject VARCHAR(255),
  content TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
) ENGINE=MyISAM;

-- Insert sample data
INSERT INTO users (email, password, name, role) VALUES 
('admin@condo.com', '$2a$10$YIjlrBt0.FFJ0VjwSHbA0OvHXQqJhUVIiTPJP1C7xXljF3Lr1Cqbi', 'Admin User', 'admin'),
('resident@condo.com', '$2a$10$YIjlrBt0.FFJ0VjwSHbA0OvHXQqJhUVIiTPJP1C7xXljF3Lr1Cqbi', 'Resident User', 'resident');

INSERT INTO units (unit_number, type, floor, status) VALUES 
('101', '1BR', 1, 'occupied'),
('102', '2BR', 1, 'occupied'),
('201', '3BR', 2, 'available'),
('202', '1BR', 2, 'occupied');

INSERT INTO facilities (name, description, capacity) VALUES 
('Pool', 'Swimming pool', 50),
('Gym', 'Fitness center', 30),
('Meeting Room', 'Conference room', 20),
('Lounge', 'Common area', 100);
