import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center mt-5">
      <h2>Страница не найдена</h2>
      <p>Ошибка 404. Похоже, такой страницы не существует.</p>
      <Link to="/" className="btn btn-primary">На главную</Link>
    </div>
  );
}

export default NotFound;