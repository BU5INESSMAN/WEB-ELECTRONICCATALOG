const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const seed = async () => {
  try {
    // Создание таблиц с уникальными ограничениями
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user'
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS brands (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        image_url VARCHAR(255),
        category_id INTEGER REFERENCES categories(id),
        brand_id INTEGER REFERENCES brands(id)
      )
    `);

    // Вставка тестовых данных для users
    const adminPassword = await bcrypt.hash('admin123', 10);
    await pool.query(`
      INSERT INTO users (email, password_hash, role) 
      VALUES ($1, $2, $3)
      ON CONFLICT (email) DO NOTHING
    `, ['admin@example.com', adminPassword, 'admin']);

    // Вставка тестовых данных для categories
    const categories = ['Холодильники', 'Стиральные машины', 'Пылесосы', 'Микроволновки'];
    for (const name of categories) {
      await pool.query(`
        INSERT INTO categories (name) 
        VALUES ($1)
        ON CONFLICT (name) DO NOTHING
      `, [name]);
    }

    // Вставка тестовых данных для brands
    const brands = ['Samsung', 'LG', 'Dyson', 'Panasonic'];
    for (const name of brands) {
      await pool.query(`
        INSERT INTO brands (name) 
        VALUES ($1)
        ON CONFLICT (name) DO NOTHING
      `, [name]);
    }

    // Вставка тестовых данных для products
    const products = [
      {
        name: 'Холодильник Samsung',
        description: 'Просторный и энергоэффективный',
        price: 35990.00,
        image_url: 'https://i.ebayimg.com/images/g/zTgAAOSwVJZjZ748/s-l640.jpg',
        category_name: 'Холодильники',
        brand_name: 'Samsung',
      },
      {
        name: 'Стиральная машина LG',
        description: 'Высокопроизводительная стиральная машина',
        price: 29990.00,
        image_url: 'https://e-mobi.com.ru/uploads/6622313bc7d7f.jpg',
        category_name: 'Стиральные машины',
        brand_name: 'LG',
      },
      {
        name: 'Пылесос Dyson',
        description: 'Мощный и легкий пылесос',
        price: 22490.00,
        image_url: 'https://avatars.mds.yandex.net/i?id=796c758b1ff0b8ec44948f562e079248_l-5246033-images-thumbs&n=13',
        category_name: 'Пылесосы',
        brand_name: 'Dyson',
      },
      {
        name: 'Микроволновка Panasonic',
        description: 'Компактная и удобная в использовании',
        price: 12990.00,
        image_url: 'https://ogo1.ru/upload/iblock/af4/af42104d845b5a9b5ec8442db3502825.jpeg',
        category_name: 'Микроволновки',
        brand_name: 'Panasonic',
      },
    ];

    for (const product of products) {
      await pool.query(`
        INSERT INTO products (name, description, price, image_url, category_id, brand_id)
        VALUES ($1, $2, $3, $4, 
                (SELECT id FROM categories WHERE name = $5), 
                (SELECT id FROM brands WHERE name = $6))
        ON CONFLICT (name) DO NOTHING
      `, [
        product.name,
        product.description,
        product.price,
        product.image_url,
        product.category_name,
        product.brand_name,
      ]);
    }

    console.log('База данных успешно заполнена');
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('Ошибка заполнения БД:', error);
    process.exit(1);
  }
};

seed();