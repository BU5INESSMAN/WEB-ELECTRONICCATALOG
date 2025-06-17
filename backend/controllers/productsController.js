const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Ошибка получения товаров:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.id); // Используем req.id из middleware
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.json(product);
  } catch (error) {
    console.error('Ошибка получения товара:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const createProduct = async (req, res) => {
  const { name, description, price, image_url, category_id, brand_id } = req.body;
  try {
    const product = await Product.create({ name, description, price, image_url, category_id, brand_id });
    res.status(201).json(product);
  } catch (error) {
    console.error('Ошибка создания товара:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const updateProduct = async (req, res) => {
  const { name, description, price, image_url, category_id, brand_id } = req.body;
  try {
    const product = await Product.update(req.id, { name, description, price, image_url, category_id, brand_id });
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.json(product);
  } catch (error) {
    console.error('Ошибка обновления товара:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const success = await Product.delete(req.id);
    if (!success) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Ошибка удаления товара:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Product.getCategories(); // Предполагаем, что метод есть
    res.json(categories);
  } catch (error) {
    console.error('Ошибка получения категорий:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const getBrands = async (req, res) => {
  try {
    const brands = await Product.getBrands(); // Предполагаем, что метод есть
    res.json(brands);
  } catch (error) {
    console.error('Ошибка получения брендов:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getBrands,
};