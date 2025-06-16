const express = require('express');
const path = require('path');
const app = express();

// Служба статических файлов фронтенда
app.use(express.static(path.join(__dirname, 'build')));

// Обработка всех остальных маршрутов через React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Подключение маршрутов
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));