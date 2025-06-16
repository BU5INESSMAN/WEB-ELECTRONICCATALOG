const pool = require('../config/db');

const Brand = {
  findAll: async () => {
    const result = await pool.query('SELECT * FROM brands');
    return result.rows;
  },
};

module.exports = Brand;