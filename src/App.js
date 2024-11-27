import logo from './logo.svg';
import './App.css';
import 'rsuite/dist/rsuite-no-reset.min.css'
import RoutesAdmin from './routes/routesAdmin';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {
  return (
    <div>
        <Router>
          <RoutesAdmin />
        </Router>
      
    </div>
  );
}

export default App;
