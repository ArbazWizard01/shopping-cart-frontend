import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "antd";
import { useCart } from "../context/CartContext";
import "./styles/products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

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
        ))}
      </div>
    </div>
  );
};

export default Products;
