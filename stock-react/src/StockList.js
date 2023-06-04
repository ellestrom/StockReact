import React from 'react';
import StockItem from './StockItem';

// StockList component that renders a list of stock items
const StockList = ({ stocks, onSaveStock, onDeleteStock }) => {
  // Function to handle saving a stock item
  const handleSaveStock = (stock) => {
    onSaveStock(stock);
  };

  // Function to handle deleting a stock item
  const handleDeleteStock = (stock) => {
    onDeleteStock(stock);
  };

  // Render the stock list component
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Ticker</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the stocks array and render a StockItem component for each item */}
          {stocks.map((item) => (
            <StockItem
              key={item.date}
              stock={item}
              onSaveStock={handleSaveStock}
              onDeleteStock={handleDeleteStock}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;



