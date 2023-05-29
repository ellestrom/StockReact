import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const apiKey = 'Y5ETTQWD6X3IQ9OJ.'; // Replace with your Alpha Vantage API key
    const symbol = 'MSFT'; // Replace with the desired stock symbol

    // Fetch stock data from the Alpha Vantage API
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const timeSeries = data['Time Series (Daily)'];
        const formattedData = Object.keys(timeSeries).map(date => ({
          date,
          open: parseFloat(timeSeries[date]['1. open']),
          high: parseFloat(timeSeries[date]['2. high']),
          low: parseFloat(timeSeries[date]['3. low']),
          close: parseFloat(timeSeries[date]['4. close']),
          volume: parseInt(timeSeries[date]['5. volume'])
        }));
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
