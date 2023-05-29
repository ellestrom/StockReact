import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [stockData, setStockData] = useState([]);
  const [symbol, setSymbol] = useState('');

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchStockData();
  };

  const fetchStockData = () => {
    if (!symbol) {
      setStockData([]);
      return;
    }

    const apiKey = 'chq7vd9r01qt7cgvtqf0chq7vd9r01qt7cgvtqfg'; // Replace with your Finnhub API key

    // Fetch stock data from the Finnhub API
    fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setStockData([]);
        } else {
          const formattedData = [{
            date: new Date().toLocaleDateString(),
            open: parseFloat(data.o),
            high: parseFloat(data.h),
            low: parseFloat(data.l),
            close: parseFloat(data.c),
            volume: parseInt(data.v)
          }];
          setStockData(formattedData);
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  return (
    <div>
      <h1>Stock Data:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="symbolInput">Enter Stock Symbol:</label>
        <input
          type="text"
          id="symbolInput"
          value={symbol}
          onChange={handleSymbolChange}
        />
        <button type="submit">Fetch Data</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
        {stockData.map(item => (
  <tr key={item.date}>
    <td>{item.date}</td>
    <td>{item.open.toFixed(2)}</td>
    <td>{item.high.toFixed(2)}</td>
    <td>{item.low.toFixed(2)}</td>
    <td>{item.close.toFixed(2)}</td>
    <td>{item.volume.toFixed(2)}</td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
};

export default MyComponent;
