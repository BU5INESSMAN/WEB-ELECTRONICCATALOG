const pool = require('../config/db');

const seedData = async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS users, products, categories, brands CASCADE');

    await pool.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user'
      );
    `);

    await pool.query(`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE brands (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image_url TEXT,
        category_id INTEGER REFERENCES categories(id),
        brand_id INTEGER REFERENCES brands(id)
      );
    `);

    await pool.query(`
      INSERT INTO categories (name) VALUES ('Холодильники'), ('Стиральные машины'), ('Пылесосы'), ('Микроволновки');
    `);

    await pool.query(`
      INSERT INTO brands (name) VALUES ('Samsung'), ('LG'), ('Dyson'), ('Panasonic');
    `);

    await pool.query(`
      INSERT INTO products (name, description, price, image_url, category_id, brand_id) VALUES
      ('Холодильник Samsung', 'Просторный и энергоэффективный', 35990.00, 'https://example.com/samsung-fridge.jpg', 1, 1),
      ('Стиральная машина LG', 'Высокопроизводительная', 29990.00, 'https://example.com/lg-washer.jpg', 2, 2),
      ('Пылесос Dyson', 'Мощный и легкий', 22490.00, 'https://example.com/dyson-vacuum.jpg', 3, 3),
      ('Микроволновка Panasonic', 'Компактная', 12990.00, 'https://example.com/panasonic-microwave.jpg', 4, 4);
    `);

    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash('123123', 10); // Пароль по умолчанию
    await pool.query(`
      INSERT INTO users (email, password, role) VALUES ('admin@admin.ru', $1, 'admin');
    `, [hashedPassword]);

    console.log('База данных успешно заполнена на Render');
    process.exit(0);
  } catch (err) {
    console.error('Ошибка заполнения БД:', err);
    process.exit(1);
  }
};

seedData();