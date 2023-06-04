import React, { useState } from 'react';

// StockForm component that represents a form to search for a stock ticker
const StockForm = ({ onStockAdd }) => {
  const [symbol, setSymbol] = useState('');

  // Function to handle changes in the symbol input
  const handleSymbolChange = (event) => {
    setSymbol(event.target.value.toUpperCase());
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (symbol) {
      onStockAdd(symbol);
      setSymbol('');
    }
  };

  // Render the stock form component
  return (
    <form onSubmit={handleSubmit}>
      <h5>Search for a Ticker!</h5>
      <input
        type="text"
        id="symbolInput"
        value={symbol}
        onChange={handleSymbolChange}
      />
      <button id="search-btn" type="submit">Search</button>
    </form>
  );
};

export default StockForm;
