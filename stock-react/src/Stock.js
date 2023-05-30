import React, { useEffect, useState } from 'react';
import StockForm from './StockForm';
import StockList from './StockList';
import SavedStocks from './SavedStocks';
import StockAlert from './StockAlert';
import './index.css';

const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [savedStocks, setSavedStocks] = useState([]);
  const [fetchedSymbols, setFetchedSymbols] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleStockAdd = (symbol) => {
    if (!fetchedSymbols.includes(symbol)) {
      fetchStockData(symbol);
    } else {
      setShowAlert(true);
    }
  };

  const saveStock = (stock) => {
    setSavedStocks((prevSavedStocks) => {
      const updatedStocks = [...prevSavedStocks, stock];
      localStorage.setItem('savedStocks', JSON.stringify(updatedStocks));
      return updatedStocks;
    });
  };

  const deleteStock = (stockToDelete) => {
    setStocks((prevStocks) => {
      const updatedStocks = prevStocks.filter((stock) => stock !== stockToDelete);
      return updatedStocks;
    });
  };

  const deleteSavedStock = (stockToDelete) => {
    setSavedStocks((prevSavedStocks) => {
      const updatedStocks = prevSavedStocks.filter((stock) => stock !== stockToDelete);
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

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Set the duration for the alert to be displayed (in milliseconds)
      return () => clearTimeout(timeout);
    }
  }, [showAlert]);

  const fetchStockData = (symbol) => {
    const apiKey = 'chq7vd9r01qt7cgvtqf0chq7vd9r01qt7cgvtqfg'; // Replace with your Finnhub API key

    // Fetch stock data from the Finnhub API
    fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          const formattedData = {
            date: new Date().toLocaleDateString(),
            open: parseFloat(data.o),
            high: parseFloat(data.h),
            low: parseFloat(data.l),
            close: parseFloat(data.c),
            ticker: symbol.toUpperCase(),
          };
          setStocks((prevStocks) => [...prevStocks, formattedData]);
          setFetchedSymbols((prevSymbols) => [...prevSymbols, symbol]);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // Initial fetch for default stock
    fetchStockData('AAPL');
  }, []);

  return (
    <div className="stock-container">
      <h1>My Stock Screen</h1>
      {showAlert && <StockAlert />}
      <StockForm onStockAdd={handleStockAdd} />
      <StockList stocks={stocks} onSaveStock={saveStock} onDeleteStock={deleteStock} />
      <SavedStocks stocks={savedStocks} onDeleteStock={deleteSavedStock} />
      </div>
    );
  };
  
  export default Stock;
  
