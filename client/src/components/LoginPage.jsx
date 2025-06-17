import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', { email, password }); // или /auth/register
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.href = '/'; // Перезагрузка для обновления Navbar
    } catch (err) {
      console.error('Ошибка:', err);
    }
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
      <h2 className="card-title text-center">Вход</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Войти</button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
}

export default LoginPage;