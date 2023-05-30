import React from 'react';

const SavedStocks = ({ stocks, onDeleteStock }) => {
  const handleDeleteStock = (stock) => {
    onDeleteStock(stock);
  };

  return (
    <div className="saved-stocks-container">
      <h2>My Stocks</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Ticker</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((item) => (
            <tr key={item.date}>
              <td>{item.date}</td>
              <td>{item.open.toFixed(2)}</td>
              <td>{item.high.toFixed(2)}</td>
              <td>{item.low.toFixed(2)}</td>
              <td>{item.close.toFixed(2)}</td>
              <td>{item.ticker}</td>
              <td>
                <button onClick={() => handleDeleteStock(item)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedStocks;