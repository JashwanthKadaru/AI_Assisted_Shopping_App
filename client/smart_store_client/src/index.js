import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider, Route, createRoutesFromElements} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Purchases from './pages/Purchases';
import Cart from './pages/Cart'
import Register from './pages/Register'
const  router = createBrowserRouter(
  
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='login' element={<Login />}/>
      <Route path='/shop' element={<Home />}/>
      <Route path='/purchases' element={<Purchases />}/>
      <Route path='/cart' element={<Cart />}/>
      <Route path='/register' element={<Register />}/>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);