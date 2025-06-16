const pool = require('../config/db');

const Product = {
  findAll: async () => {
    const result = await pool.query(`
      SELECT p.*, c.name AS category_name, b.name AS brand_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      JOIN brands b ON p.brand_id = b.id
    `);
    return result.rows;
  },
  findById: async (id) => {
    const result = await pool.query(`
      SELECT p.*, c.name AS category_name, b.name AS brand_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      JOIN brands b ON p.brand_id = b.id
      WHERE p.id = $1
    `, [id]);
    return result.rows[0];
  },
  create: async ({ name, description, price, image_url, category_id, brand_id }) => {
    const result = await pool.query(
      'INSERT INTO products (name, description, price, image_url, category_id, brand_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, image_url, category_id, brand_id]
    );
    return result.rows[0];
  },
  update: async (id, { name, description, price, image_url, category_id, brand_id }) => {
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, image_url = $4, category_id = $5, brand_id = $6 WHERE id = $7 RETURNING *',
      [name, description, price, image_url, category_id, brand_id, id]
    );
    return result.rows[0];
  },
  delete: async (id) => {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  },
};

module.exports = Product;