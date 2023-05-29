import React, { useState } from 'react';

const StockForm = ({ onStockAdd }) => {
  const [symbol, setSymbol] = useState('');

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value.toUpperCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (symbol) {
      onStockAdd(symbol);
      setSymbol('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="symbolInput">Enter Stock Symbol:</label>
      <input
        type="text"
        id="symbolInput"
        value={symbol}
        onChange={handleSymbolChange}
      />
      <button type="submit">Add Stock</button>
    </form>
  );
};

export default StockForm;