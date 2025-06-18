const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getBrands,
} = require('../controllers/productsController');

// Отдельные эндпоинты для категорий и брендов
router.get('/categories', getCategories);
router.get('/brands', getBrands);

// Основной список товаров
router.get('/products', getProducts);

// Получение товара по ID
router.get('/products/:id', getProductById);

// Создание, обновление и удаление товаров
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;