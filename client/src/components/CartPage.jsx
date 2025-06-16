import React, { useState, useEffect } from 'react';

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Корзина</h2>
      {cart.length === 0 && <p>Корзина пуста</p>}
      {cart.map((item) => (
        <div className="card mb-3" key={item.id}>
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">Цена: {item.price} ₽</p>
            <p className="card-text">Количество:
              <button className="btn btn-sm btn-outline-primary mx-2" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              {item.quantity}
              <button className="btn btn-sm btn-outline-primary mx-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </p>
            <button className="btn btn-danger" onClick={() => removeItem(item.id)}>Удалить</button>
          </div>
        </div>
      ))}
      {cart.length > 0 && <h4>Итого: {total} ₽</h4>}
    </div>
  );
}

export default CartPage;