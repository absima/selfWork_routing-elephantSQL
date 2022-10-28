import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ProjContextProvider from './projContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjContextProvider>
      <App />
    </ProjContextProvider>    
  </React.StrictMode>
)
