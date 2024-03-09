import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { MainRoutes } from './routes'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>      
    <Router>
      <MainRoutes /> 
    </Router>
  </React.StrictMode>,
);