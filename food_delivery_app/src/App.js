import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import SignUp from './screens/SignUp.js';
import { CartProvider } from './components/ContextReducer.js';
import MyOrder from './screens/MyOrder.js';

function App() {

  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/createuser' element={<SignUp />} />

            <Route path='/myOrderData' element={<MyOrder />} />



          </Routes>
        </div>

      </Router>
    </CartProvider>
  );



}

export default App;
