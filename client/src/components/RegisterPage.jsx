import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Register data:', { email, password, role }); // Отладка
    try {
      const response = await API.post('/auth/register', { email, password, role });
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        setMessage('Регистрация успешно завершена');
        setTimeout(() => navigate('/'), 1000);
      } else {
        setMessage('Ошибка: данные пользователя отсутствуют');
      }
    } catch (error) {
      console.error('Ошибка регистрации на фронтенде:', error);
      setMessage(error.response?.data?.message || 'Ошибка при регистрации');
    }
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
      <h2 className="card-title text-center">Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option value="user">Пользователь</option>
            <option value="admin">Администратор</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">Зарегистрироваться</button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
}

export default RegisterPage;