import React from 'react';

const StockItem = ({ stock, onSaveStock }) => {
  const handleSaveStock = () => {
    onSaveStock(stock);
  };

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
      </td>
    </tr>
  );
};

export default StockItem;
