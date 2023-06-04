import React from 'react';

// StockItem component that represents a single stock item in the list
const StockItem = ({ stock, onSaveStock, onDeleteStock }) => {
  // Function to handle saving the stock item
  const handleSaveStock = () => {
    onSaveStock(stock);
  };

  // Function to handle deleting the stock item
  const handleDeleteStock = () => {
    onDeleteStock(stock);
  };

  // Render the stock item component
  return (
    <tr>
      <td>{stock.date}</td>
      <td>{stock.open.toFixed(2)}</td>
      <td>{stock.high.toFixed(2)}</td>
      <td>{stock.low.toFixed(2)}</td>
      <td>{stock.close.toFixed(2)}</td>
      <td>{stock.ticker}</td>
      <td>
        <button onClick={handleSaveStock}>Save</button>
        <button onClick={handleDeleteStock}>Delete</button>
      </td>
    </tr>
  );
};

export default StockItem;
