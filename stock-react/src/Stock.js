import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const apiKey = 'chq7vd9r01qt7cgvtqf0chq7vd9r01qt7cgvtqfg'; // Replace with your Finnhub API key
    const symbol = 'AAPL'; // Replace with the desired stock symbol

    // Fetch stock data from the Finnhub API
    fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const formattedData = [{
          date: new Date().toLocaleDateString(),
          open: parseFloat(data.o),
          high: parseFloat(data.h),
          low: parseFloat(data.l),
          close: parseFloat(data.c),
          volume: parseInt(data.v)
        }];
        setStockData(formattedData);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Stock Data:</h1>
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
              <td>{item.open}</td>
              <td>{item.high}</td>
              <td>{item.low}</td>
              <td>{item.close}</td>
              <td>{item.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyComponent;
