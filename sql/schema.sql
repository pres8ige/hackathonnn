CREATE DATABASE IF NOT EXISTS complaints_db;
USE complaints_db;

CREATE TABLE IF NOT EXISTS complaints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) DEFAULT NULL,
  original_message TEXT NOT NULL,
  ai_summary TEXT NOT NULL,
  ai_reply TEXT NOT NULL,
  complaint_type VARCHAR(100) NOT NULL DEFAULT 'other_issue',
  product_type VARCHAR(100) NOT NULL DEFAULT 'other',
  ai_sentiment VARCHAR(50) NOT NULL DEFAULT 'negative',
  ai_severity VARCHAR(50) NOT NULL DEFAULT 'medium',
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
