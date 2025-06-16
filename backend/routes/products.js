const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getCategories, getBrands } = require('../controllers/productsController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Сначала статические маршруты
router.get('/categories', getCategories);
router.get('/brands', getBrands);

// Затем динамические маршруты
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, adminMiddleware, createProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;