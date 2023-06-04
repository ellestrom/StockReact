import React from 'react';

// SavedStocks component that renders a table of saved stocks
const SavedStocks = ({ stocks, onDeleteStock }) => {
  // Function to handle deleting a stock
  const handleDeleteStock = (stock) => {
    onDeleteStock(stock);
  };

  // Render the SavedStocks component
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
          {/* Map over the stocks array and render a table row for each stock */}
          {stocks.map((item) => (
            <tr key={item.date}>
              <td>{item.date}</td>
              <td>{item.open.toFixed(2)}</td>
              <td>{item.high.toFixed(2)}</td>
              <td>{item.low.toFixed(2)}</td>
              <td>{item.close.toFixed(2)}</td>
              <td>{item.ticker}</td>
              <td>
                {/* Call handleDeleteStock function with the current stock item */}
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
