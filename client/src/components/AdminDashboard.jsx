import React, { useState, useEffect } from 'react';
import API from '../api';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    image_url: '',
    category_id: '',
    brand_id: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, brandsRes] = await Promise.all([
          API.get('/products'),
          API.get('/products/categories'),
          API.get('/products/brands'),
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
        setBrands(brandsRes.data);
      } catch (err) {
        setError('Не удалось загрузить данные');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await API.put(`/products/${form.id}`, form);
      } else {
        await API.post('/products', form);
      }
      const response = await API.get('/products');
      setProducts(response.data);
      setForm({ id: null, name: '', description: '', price: '', image_url: '', category_id: '', brand_id: '' });
    } catch (err) {
      setError(err.response?.data.message || 'Ошибка при сохранении');
    }
  };

  const editProduct = (product) => {
    setForm(product);
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Удалить товар?')) {
      try {
        await API.delete(`/products/${id}`);
        const response = await API.get('/products');
        setProducts(response.data);
      } catch (err) {
        setError('Ошибка при удалении');
      }
    }
  };

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Панель администратора</h2>
      <h4>{form.id ? 'Редактировать товар' : 'Добавить товар'}</h4>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Название"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Описание"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Цена"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="URL изображения"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            required
          >
            <option value="">Выберите категорию</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            value={form.brand_id}
            onChange={(e) => setForm({ ...form, brand_id: e.target.value })}
            required
          >
            <option value="">Выберите бренд</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Сохранить</button>
        {form.id && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setForm({ id: null, name: '', description: '', price: '', image_url: '', category_id: '', brand_id: '' })}
          >
            Отмена
          </button>
        )}
      </form>
      <h4>Список товаров</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Цена</th>
            <th>Категория</th>
            <th>Бренд</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price} ₽</td>
              <td>{product.category_name}</td>
              <td>{product.brand_name}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => editProduct(product)}>Редактировать</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(product.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;