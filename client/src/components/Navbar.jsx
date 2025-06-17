import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    try {
      const parsedUser = storedUser ? JSON.parse(storedUser) : {};
      if (parsedUser && typeof parsedUser === 'object' && parsedUser.role) {
        setUser(parsedUser);
      } else {
        setUser({});
        localStorage.removeItem('user'); // Очищаем при некорректных данных
      }
    } catch (e) {
      console.error('Ошибка парсинга пользователя:', e);
      setUser({});
      localStorage.removeItem('user');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser({});
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Каталог электроники</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Главная</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Корзина</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/exchange-rates">Курсы валют</Link>
            </li>
            {user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Админ-панель</Link>
              </li>
            )}
            {token ? (
              <li className="nav-item">
                <button className="nav-link btn" onClick={handleLogout}>
                  Выйти
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Вход</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Регистрация</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;