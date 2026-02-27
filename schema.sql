USE food_trend_agent;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  restaurant_name VARCHAR(160) NOT NULL,
  location VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  password_salt VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_users_email (email),
  INDEX idx_users_location (location)
);

ALTER TABLE users
  ADD COLUMN restaurant_name VARCHAR(160) NOT NULL DEFAULT 'Unknown Restaurant' AFTER name;

ALTER TABLE users
  ADD COLUMN location VARCHAR(120) NOT NULL DEFAULT 'Unknown' AFTER restaurant_name;
