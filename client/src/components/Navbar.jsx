import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Предположим, что данные пользователя хранятся в localStorage
    const storedUser = localStorage.getItem('user');
    try {
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser);
    } catch (e) {
      console.error('Ошибка парсинга пользователя:', e);
      setUser(null); // Устанавливаем null при ошибке
      localStorage.removeItem('user'); // Очищаем повреждённые данные
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Электронный каталог</Link>
        <div className="navbar-nav">
          {user ? (
            <>
              <span className="nav-link">Привет, {user.email}</span>
              <button className="nav-link btn btn-link" onClick={handleLogout}>Выйти</button>
            </>
          ) : (
            <Link className="nav-link" to="/login">Войти</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;