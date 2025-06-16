const express = require('express');
const path = require('path');
const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Подключение маршрутов API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

// Служба статических файлов фронтенда
app.use(express.static(path.join(__dirname, 'build')));

// Обработка всех остальных маршрутов через React (после API)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));