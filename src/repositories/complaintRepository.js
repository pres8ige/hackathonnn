const pool = require("../db/pool");

async function hasColumn(columnName) {
  const [rows] = await pool.execute(
    `
      SELECT COUNT(*) AS count
      FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'complaints'
        AND COLUMN_NAME = ?
    `,
    [columnName]
  );

  return Number(rows[0]?.count || 0) > 0;
}

async function ensureTable() {
  await pool.execute(`
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
    )
  `);

  if (!(await hasColumn("ai_sentiment"))) {
    await pool.execute(`
      ALTER TABLE complaints
      ADD COLUMN ai_sentiment VARCHAR(50) NOT NULL DEFAULT 'negative'
    `);
  }

  if (!(await hasColumn("ai_severity"))) {
    await pool.execute(`
      ALTER TABLE complaints
      ADD COLUMN ai_severity VARCHAR(50) NOT NULL DEFAULT 'medium'
    `);
  }

  if (!(await hasColumn("complaint_type"))) {
    await pool.execute(`
      ALTER TABLE complaints
      ADD COLUMN complaint_type VARCHAR(100) NOT NULL DEFAULT 'other_issue'
    `);
  }

  if (!(await hasColumn("product_type"))) {
    await pool.execute(`
      ALTER TABLE complaints
      ADD COLUMN product_type VARCHAR(100) NOT NULL DEFAULT 'other'
    `);
  }
}

async function createComplaint(complaint) {
  const [result] = await pool.execute(
    `
      INSERT INTO complaints (
        customer_name,
        email,
        original_message,
        ai_summary,
        ai_reply,
        complaint_type,
        product_type,
        ai_sentiment,
        ai_severity,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      complaint.customerName,
      complaint.email || null,
      complaint.message,
      complaint.summary,
      complaint.reply,
      complaint.complaintType,
      complaint.productType,
      complaint.sentiment,
      complaint.severity,
      complaint.status || "new"
    ]
  );

  return findComplaintById(result.insertId);
}

async function listComplaints() {
  const [rows] = await pool.execute(`
    SELECT
      id,
      customer_name AS customerName,
      email,
      original_message AS message,
      ai_summary AS summary,
      ai_reply AS reply,
      complaint_type AS complaintType,
      product_type AS productType,
      ai_sentiment AS sentiment,
      ai_severity AS severity,
      status,
      created_at AS createdAt
    FROM complaints
    ORDER BY created_at DESC
  `);

  return rows;
}

async function findComplaintById(id) {
  const [rows] = await pool.execute(
    `
      SELECT
        id,
        customer_name AS customerName,
        email,
        original_message AS message,
        ai_summary AS summary,
        ai_reply AS reply,
        complaint_type AS complaintType,
        product_type AS productType,
        ai_sentiment AS sentiment,
        ai_severity AS severity,
        status,
        created_at AS createdAt
      FROM complaints
      WHERE id = ?
    `,
    [id]
  );

  return rows[0] || null;
}

module.exports = {
  ensureTable,
  createComplaint,
  listComplaints,
  findComplaintById
};
