import logo from './logo.svg';
//import './App.css';

import { Ruta } from './routes/routes';
//import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import React, { Fragment } from 'react';
import {Ganados ,Cobranza} from './pages'
import { Navigate } from 'react-router-dom';
import Login from './pages/login/index';


function App() {
//const autenticado = true

  return ( 
     <Fragment>
          <Router   children={Ruta}  />
     </Fragment>
    
  );
}
    
export default App;

