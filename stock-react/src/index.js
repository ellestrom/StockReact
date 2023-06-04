import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyComponent from './Stock';

ReactDOM.render(
  <React.StrictMode>
    {/* Render the MyComponent component */}
    <MyComponent />
  </React.StrictMode>,
  document.getElementById('root')
);
