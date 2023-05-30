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
    const isStockExisting = fetchedSymbols.includes(symbol);
  
    if (isStockExisting) {
      setShowAlert(true);
    } else {
      validateStockSymbol(symbol);
    }
  };
  
  const validateStockSymbol = (symbol) => {
    const apiKey = 'chq7vd9r01qt7cgvtqf0chq7vd9r01qt7cgvtqfg';
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.error || !data.t) {
          alert(`Stock with symbol ${symbol} does not exist. Please try again.`);
        } else {
          fetchStockData(symbol);
          setFetchedSymbols((prevSymbols) => [...prevSymbols, symbol]);
        }
      })
      .catch((error) => console.log(error));
  };    

  const saveStock = (stock) => {
    const isStockSaved = savedStocks.some((savedStock) => savedStock.ticker === stock.ticker);
  
    if (!isStockSaved) {
      setSavedStocks((prevSavedStocks) => {
        const updatedStocks = [...prevSavedStocks, stock];
        localStorage.setItem('savedStocks', JSON.stringify(updatedStocks));
        return updatedStocks;
      });
    } else {
      window.alert('Stock already saved');
    }
  };  

  const deleteStock = (stockToDelete) => {
    setStocks((prevStocks) => {
      const updatedStocks = prevStocks.filter((stock) => stock !== stockToDelete);
      return updatedStocks;
    });
  };

  useEffect(() => {
    const savedStocksData = localStorage.getItem('savedStocks');
    if (savedStocksData) {
      const parsedStocks = JSON.parse(savedStocksData);
      const updatedStocks = parsedStocks.map((stock) => {
        const currentDate = new Date().toLocaleDateString();
        return { ...stock, date: currentDate };
      });
      setSavedStocks(updatedStocks);
    }
  }, []);

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
    fetchStockData('GOOG');
    fetchStockData('TSLA');
    fetchStockData('NVDA');
  }, []);

  return (
    <div className="stock-container">
      <h1>Stockify</h1>
      {showAlert && <StockAlert />}
      <StockForm onStockAdd={handleStockAdd} />
      <StockList stocks={stocks} onSaveStock={saveStock} onDeleteStock={deleteStock} />
      <SavedStocks stocks={savedStocks} onDeleteStock={deleteSavedStock} />
      </div>
    );
  };
  
  export default Stock;