import logo from './logo.svg';
//import './App.css';

import { Ruta } from './routes/routes';
//import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Fragment } from 'react';
import {Ganados ,Cobranza} from './pages'

function App() {
  return ( 
    <Fragment>
         <Router children={Ruta}/>
    </Fragment>
         
  );
}
    
export default App;

