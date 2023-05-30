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
      <h5>Search for a Ticker!</h5>
      <input
        type="text"
        id="symbolInput"
        value={symbol}
        onChange={handleSymbolChange}
      />
      <button id ="search-btn" type="submit">Search</button>
    </form>
  );
};

export default StockForm;