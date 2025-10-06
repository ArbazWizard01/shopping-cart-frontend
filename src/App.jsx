import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <nav className="navbar">
<<<<<<< HEAD
=======
          <Link to="/">Products</Link>
>>>>>>> 7f07aba2a71d571ae8eb240ad8b0f6f0d1df480f
          <Link to="/cart">Cart</Link>
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
