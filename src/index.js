import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './components/products';
import SingleProduct from './components/SingleProduct';
import { AuthContextProvider } from './components/authentication';
import Login from './components/Login';
import CartPage from './components/cartPage';
import Admin from './components/admin';
import PaymentSuccess from './components/PaymentSuccess';
import Orders from './components/Orders';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Products />} />
        <Route path="/FashionNova/Products/:ProductID" element={<SingleProduct />} />
        <Route path="/FashionNova/CartPage" element={<CartPage />} />
        <Route path="/FashionNova/admin" element={<Admin />} />
        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        <Route path="/Orders" element={<Orders />} />
      </Routes>
    </AuthContextProvider>
  </BrowserRouter>
);