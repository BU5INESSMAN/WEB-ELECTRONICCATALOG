const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Если используете токены, установите через npm install jsonwebtoken
const secret = 'your-secret-key'; // Замените на безопасный ключ

const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    console.log('Register attempt:', { email, password, role });
    const existingUser = await User.findByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Пользователь уже существует' });
    if (!password) return res.status(400).json({ message: 'Пароль обязателен' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: passwordHash, role });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '1h' });
    res.status(201).json({ user, token, message: 'Регистрация успешна' });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Login attempt:', { email, password });
    if (!email || !password) return res.status(400).json({ message: 'Email и пароль обязательны' });
    const user = await User.findByEmail(email);
    console.log('User found:', user);
    if (!user) return res.status(400).json({ message: 'Пользователь не найден' });
    if (!user.password) return res.status(500).json({ message: 'Пароль пользователя отсутствует' });
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '1h' });
    res.json({ user, token, message: 'Успешный вход' });
  } catch (error) {
    console.error('Ошибка логина:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { register, login };