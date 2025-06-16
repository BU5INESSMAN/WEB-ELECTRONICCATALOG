import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExchangeRatesPage() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [date, setDate] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('usd');
  const currencies = ['usd', 'eur', 'rub', 'gbp', 'jpy', 'cny'];

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError('');
      try {
        // Основной эндпоинт
        let response = await axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`);
        setRates(response.data[baseCurrency]);
        setDate(response.data.date);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка загрузки с основного API:', err);
        try {
          // Резервный эндпоинт
          let fallbackResponse = await axios.get(`https://latest.currency-api.pages.dev/v1/currencies/${baseCurrency}.json`);
          setRates(fallbackResponse.data[baseCurrency]);
          setDate(fallbackResponse.data.date);
          setLoading(false);
        } catch (fallbackErr) {
          console.error('Ошибка загрузки с резервного API:', fallbackErr);
          setError('Не удалось загрузить курсы валют');
          setLoading(false);
        }
      }
    };

    fetchRates();
  }, [baseCurrency]);

  const handleCurrencyChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  if (loading) return <div className="text-center mt-5">Загрузка...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Курсы валют (по состоянию на {date})</h2>
      <div className="row mb-4 justify-content-center">
        <div className="col-md-4">
          <label htmlFor="currency-select" className="form-label">Базовая валюта:</label>
          <select
            id="currency-select"
            className="form-select"
            value={baseCurrency}
            onChange={handleCurrencyChange}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-center">Базовая валюта: {baseCurrency.toUpperCase()} (1 {baseCurrency.toUpperCase()})</p>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Код</th>
              <th>Курс</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rates).map(([currency, rate]) => (
              <tr key={currency}>
                <td>{currency.toUpperCase()}</td>
                <td>{currency.toUpperCase()}</td>
                <td>{rate.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExchangeRatesPage;