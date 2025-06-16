const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    console.log('Данные запроса регистрации:', { email, password, role });
    if (!email || !password) {
      return res.status(400).json({ message: 'Email и пароль обязательны' });
    }
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET не определён в переменных окружения');
    }
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Хэшированный пароль:', hashedPassword);
    const user = await User.create({ email, password_hash: hashedPassword, role: role || 'user' });
    console.log('Созданный пользователь:', user);
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Ошибка регистрации на бэкенде:', error.message, error.stack);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { register, login };