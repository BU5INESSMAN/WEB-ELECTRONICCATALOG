const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');

const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Служба API-роутов
app.use('/api', authRoutes);
app.use('/api', productsRoutes);

// Служба статических файлов из build
app.use(express.static(path.join(__dirname, 'build')));

// Fallback на index.html для клиентских маршрутов
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), (err) => {
    if (err) {
      console.error('Ошибка при отправке index.html:', err);
      res.status(500).send('Ошибка сервера');
    }
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});