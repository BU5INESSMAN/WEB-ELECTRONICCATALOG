const pool = require('./config/db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Ошибка подключения:', err);
  } else {
    console.log('Подключение успешно:', res.rows[0]);
  }
  pool.end();
});