import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Fetching product with ID:', id); // Отладка
    API.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        console.log('Product data:', res.data);
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
        setError('Товар не найден');
      });
  }, [id]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!product) return <p>Загрузка...</p>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Товар добавлен в корзину!');
  };

  const imageUrl = product.image_url || 'https://via.placeholder.com/300';

  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={imageUrl}
            className="img-fluid"
            alt={product.name}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title">{product.name}</h3>
            <p className="card-text">{product.description}</p>
            <p className="card-text"><strong>Цена: {product.price} ₽</strong></p>
            <p className="card-text">Категория: {product.category_name}</p>
            <p className="card-text">Бренд: {product.brand_name}</p>
            <button className="btn btn-success" onClick={addToCart}>Добавить в корзину</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;