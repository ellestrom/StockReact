import React, { useEffect, useState } from 'react';
import StockForm from './StockForm';
import StockList from './StockList';
import SavedStocks from './SavedStocks';
import './index.css';

const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [savedStocks, setSavedStocks] = useState([]);

  const handleStockAdd = (symbol) => {
    fetchStockData(symbol);
  };

  const saveStock = (stock) => {
    setSavedStocks((prevSavedStocks) => {
      const updatedStocks = [...prevSavedStocks, stock];
      localStorage.setItem('savedStocks', JSON.stringify(updatedStocks));
      return updatedStocks;
    });
  };

  useEffect(() => {
    const savedStocksData = localStorage.getItem('savedStocks');
    if (savedStocksData) {
      setSavedStocks(JSON.parse(savedStocksData));
    }
  }, []);

  const fetchStockData = (symbol) => {
    const apiKey = 'chq7vd9r01qt7cgvtqf0chq7vd9r01qt7cgvtqfg'; // Replace with your Finnhub API key

    // Fetch stock data from the Finnhub API
    fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          const formattedData = {
            date: new Date().toLocaleDateString(),
            open: parseFloat(data.o),
            high: parseFloat(data.h),
            low: parseFloat(data.l),
            close: parseFloat(data.c),
            ticker: symbol
          };
          setStocks(prevStocks => [...prevStocks, formattedData]);
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    // Initial fetch for default stock
    fetchStockData('AAPL');
  }, []);

  return (
    <div className="stock-container">
      <h1>Stock Data:</h1>
      <StockForm onStockAdd={handleStockAdd} />
      <StockList stocks={stocks} onSaveStock={saveStock} />
      <SavedStocks stocks={savedStocks} />
    </div>
  );
};

export default Stock;
