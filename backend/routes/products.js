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

// Основной список товаров
router.get('/', getProducts);
// Получение товара по ID
router.get('/:id', getProductById);
// Создание, обновление и удаление товаров
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
// Отдельные эндпоинты для категорий и брендов
router.get('/categories', getCategories);
router.get('/brands', getBrands);

module.exports = router;