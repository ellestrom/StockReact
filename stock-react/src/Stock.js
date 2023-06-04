import React, { useEffect, useState } from 'react';
import StockForm from './StockForm';
import StockList from './StockList';
import SavedStocks from './SavedStocks';
import StockAlert from './StockAlert';
import './index.css';

// Stock Component
const Stock = () => {
  // State variables
  const [stocks, setStocks] = useState([]); // Holds the list of fetched stock data
  const [savedStocks, setSavedStocks] = useState([]); // Holds the list of saved stocks
  const [fetchedSymbols, setFetchedSymbols] = useState([]); // Holds the symbols of the fetched stocks
  const [showAlert, setShowAlert] = useState(false); // Controls the display of an alert

  // Handles adding a stock to the list
  const handleStockAdd = (symbol) => {
    const isStockExisting = fetchedSymbols.includes(symbol);
  
    if (isStockExisting) {
      setShowAlert(true); // Displays an alert if the stock already exists
    } else {
      validateStockSymbol(symbol); // Proceeds to validate and fetch the stock data
    }
  };
  

  // Validates the stock symbol by making an API request
  const validateStockSymbol = (symbol) => {
    const apiKey = 'chq7vd9r01qt7cgvtqf0chq7vd9r01qt7cgvtqfg';
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
    
    // Fetch stock data from the provided API URL
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Check if the API response contains an error or if the stock does not exist
        if (data.error || !data.t) {
          alert(`Stock with symbol ${symbol} does not exist. Please try again.`);
        } else {
          // Fetch additional stock data and update the fetched symbols list
          fetchStockData(symbol);
          setFetchedSymbols((prevSymbols) => [...prevSymbols, symbol]);
        }
      })
      .catch((error) => console.log(error));
  };    

  // Saves a stock to the list of saved stocks
  const saveStock = (stock) => {
    // Check if the stock is already saved by comparing tickers
    const isStockSaved = savedStocks.some((savedStock) => savedStock.ticker === stock.ticker);
  
    if (!isStockSaved) {
      // If the stock is not already saved, update the saved stocks list
      setSavedStocks((prevSavedStocks) => {
        const updatedStocks = [...prevSavedStocks, stock];
        localStorage.setItem('savedStocks', JSON.stringify(updatedStocks)); // Save the updated stocks list to local storage
        return updatedStocks;
      });
    } else {
      // If the stock is already saved, display an alert
      window.alert('Stock already saved');
    }
  };  

  // Handles deletion of stocks from the stock list
  const deleteStock = (stockToDelete) => {
    setStocks((prevStocks) => {
      // Filter out the stock to be deleted from the previous stocks list
      const updatedStocks = prevStocks.filter((stock) => stock !== stockToDelete);
      return updatedStocks; // Returns the updated stocks list
    });
  };

  // Retrieves saved stocks data from local storage and updates the savedStocks state
  useEffect(() => {
    const savedStocksData = localStorage.getItem('savedStocks');
    if (savedStocksData) {
      const parsedStocks = JSON.parse(savedStocksData);
      const updatedStocks = parsedStocks.map((stock) => {
        const currentDate = new Date().toLocaleDateString(); // Updates the current date of the stocks in the list
        return { ...stock, date: currentDate }; // Returns the information to the list
      });
      setSavedStocks(updatedStocks);
    }
  }, []);

  // Deletes a saved stock from the savedStocks state and updates local storage
  const deleteSavedStock = (stockToDelete) => {
    setSavedStocks((prevSavedStocks) => {
      // Filter out the stock to be deleted from the previous saved stocks list
      const updatedStocks = prevSavedStocks.filter((stock) => stock !== stockToDelete);
      localStorage.setItem('savedStocks', JSON.stringify(updatedStocks)); // Update local storage with the updated saved stocks list
      return updatedStocks; // Return the updated saved stocks list
    });
  };

  // Fetches saved stocks data from local storage and updates the savedStocks state
  useEffect(() => {
    const savedStocksData = localStorage.getItem('savedStocks');
    if (savedStocksData) {
      setSavedStocks(JSON.parse(savedStocksData));
    }
  }, []);

  // Controls the duration for displaying the alert by setting a timeout
  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Set the duration for the alert to be displayed (in milliseconds)
      return () => clearTimeout(timeout); // Removes the alert
    }
  }, [showAlert]);

  const fetchStockData = (symbol) => {
    const apiKey = 'chq7vd9r01qt7cgvtqf0chq7vd9r01qt7cgvtqfg'; // Finnhub API key

    // Fetch stock data from the Finnhub API
    fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          // Format the fetched data and update the stocks state
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

  // Executes the initial fetch for default stocks (GOOG, TSLA, NVDA)
  useEffect(() => {
    // Initial fetch for default stock
    fetchStockData('GOOG');
    fetchStockData('TSLA');
    fetchStockData('NVDA');
  }, []);
  // This is where we print the information (titles, description and stock information)
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