import React from 'react';

const StockItem = ({ stock }) => {
  return (
    <tr>
      <td>{stock.date}</td>
      <td>{stock.open.toFixed(2)}</td>
      <td>{stock.high.toFixed(2)}</td>
      <td>{stock.low.toFixed(2)}</td>
      <td>{stock.close.toFixed(2)}</td>
      <td>{stock.ticker}</td>
    </tr>
  );
};

export default StockItem;