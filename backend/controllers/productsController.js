const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    console.log('Fetched products:', products); // Отладка
    res.json(products);
  } catch (error) {
    console.error('Ошибка получения товаров:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const getProductById = async (req, res) => {
  try {
    console.log('Requested ID:', req.params.id);
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.json(product);
  } catch (error) {
    console.error('Ошибка получения товара:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// ... (остальные методы остаются без изменений)

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getBrands,
};