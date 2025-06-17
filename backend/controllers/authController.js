const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Пользователь уже существует' });
    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password_hash, role });
    res.status(201).json(user);
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

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

module.exports = { register, login };