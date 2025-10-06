import React, { useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { useCart } from "../context/CartContext";
import "./styles/cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/checkout", {
        items: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      });

      setCheckoutMessage(
        `✅ ${res.data.message} | Total: $${res.data.total}`
      );
      clearCart();
    } catch (err) {
      console.error("Checkout failed:", err);
      setCheckoutMessage("❌ Checkout failed. Try again.");
    }
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
                <div className="quantity-controls">
                  <Button onClick={() => decreaseQuantity(item.id)}>-</Button>
                  <Button onClick={() => increaseQuantity(item.id)}>+</Button>
                  <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
          <Button onClick={handleCheckout}>Checkout</Button>
        </div>
      )}
      {checkoutMessage && <p>{checkoutMessage}</p>}
    </div>
  );
};

export default Cart;
