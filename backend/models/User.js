const pool = require('../config/db');

const User = {
  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },
  create: async ({ email, password_hash, role }) => {
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *',
      [email, password_hash, role]
    );
    return result.rows[0];
  },
};

module.exports = User;