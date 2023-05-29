import React from 'react';
import StockItem from './StockItem';

const StockList = ({ stocks }) => {
  return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Ticker</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((item) => (
            <StockItem key={item.date} stock={item} />
          ))}
        </tbody>
      </table>
  );
};

export default StockList;
