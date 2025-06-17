const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');

const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Служба статических файлов (из папки build)
app.use('/images', express.static(path.join(__dirname, '../build/images')));

// Роуты
app.use('/api', authRoutes);
app.use('/api', productsRoutes);

// Служба клиентского build
app.use(express.static(path.join(__dirname, '../build')));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});