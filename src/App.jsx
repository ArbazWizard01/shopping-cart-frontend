import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import { FiShoppingCart } from 'react-icons/fi';
import "./App.css";


const gradientBrandStyle = {
    fontSize: '1.8rem',
    fontWeight: '900',
    textDecoration: 'none',
    backgroundImage: 'linear-gradient(90deg, #1a5ca5 0%, #2A73C2 50%, #4a8ed0 100%)',
    color: 'transparent',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    transition: 'all 0.2s ease',
};
function App() {
  return (
    <CartProvider>
      <Router>
        <nav className="navbar">
          <Link to="/" style={gradientBrandStyle}>
              VERTO
          </Link>
          <Link to="/cart"><FiShoppingCart/></Link>
        </nav>

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;