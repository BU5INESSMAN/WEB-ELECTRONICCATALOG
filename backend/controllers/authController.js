const User = require('../models/User');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ message: 'Пользователь не найден' });
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' });
    res.json({ message: 'Успешный вход', user });
  } catch (error) {
    console.error('Ошибка логина:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { login };