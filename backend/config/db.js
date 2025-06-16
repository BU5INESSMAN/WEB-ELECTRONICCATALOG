const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'electronics_store',
  password: '123123',
  port: 5432,
});

module.exports = pool;