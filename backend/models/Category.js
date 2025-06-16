const pool = require('../config/db');

const Category = {
  findAll: async () => {
    const result = await pool.query('SELECT * FROM categories');
    return result.rows;
  },
};

module.exports = Category;