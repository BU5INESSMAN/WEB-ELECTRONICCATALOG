const User = require('../models/User');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    console.log('User found:', user);
    if (!user) return res.status(400).json({ message: 'Пользователь не найден' });
    if (!user.password) return res.status(500).json({ message: 'Пароль пользователя отсутствует' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' });
    res.json({ message: 'Успешный вход', user }); // Клиент сохранит это в localStorage
  } catch (error) {
    console.error('Ошибка логина:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Пользователь уже существует' });
    if (!password) return res.status(400).json({ message: 'Пароль обязателен' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: passwordHash, role });
    res.status(201).json({ user, message: 'Регистрация успешна' }); // Клиент сохранит это
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { register, login };