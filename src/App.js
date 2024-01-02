import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from 'react';
import axios from "axios";
import { CurrencyList } from './Constants/Constatns';
import Home from './Page/Home';

function App() {


  return (
    
    <Home/>
  );
}

export default App;
