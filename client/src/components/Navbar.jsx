import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Получаем данные пользователя из localStorage
    const storedUser = localStorage.getItem('user');
    try {
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      if (parsedUser && typeof parsedUser === 'object' && parsedUser.email) {
        setUser(parsedUser);
      } else {
        setUser(null);
        localStorage.removeItem('user'); // Очищаем при некорректных данных
      }
    } catch (e) {
      console.error('Ошибка парсинга пользователя:', e);
      setUser(null);
      localStorage.removeItem('user'); // Очищаем при ошибке
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