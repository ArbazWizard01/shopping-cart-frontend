import React, { useState, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
import { Card, Button } from "antd";
import { useCart } from "../context/CartContext";
import "./styles/products.css";
=======
>>>>>>> 7f07aba2a71d571ae8eb240ad8b0f6f0d1df480f

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const { addToCart } = useCart();
=======
>>>>>>> 7f07aba2a71d571ae8eb240ad8b0f6f0d1df480f

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching products: ", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="products-container">
<<<<<<< HEAD
      <div className="product-list">
        {products.map((product) => (
          <Card key={product.id} loading={loading}>
            <div className="product-card">
              <img src={product.imageUrl} />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            </div>
          </Card>
=======
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button>Add to Cart</button>
          </div>
>>>>>>> 7f07aba2a71d571ae8eb240ad8b0f6f0d1df480f
        ))}
      </div>
    </div>
  );
};

export default Products;
