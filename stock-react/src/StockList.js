import React from 'react';
import StockItem from './StockItem';

const StockList = ({ stocks, onSaveStock, onDeleteStock }) => {
    const handleSaveStock = (stock) => {
      onSaveStock(stock);
    };
  
    const handleDeleteStock = (stock) => {
        onDeleteStock(stock);
      };           
  
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


