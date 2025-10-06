import React, { useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { Link } from "react-router-dom"; 
import { useCart } from "../context/CartContext";
import "./styles/cart.css";
import { FiShoppingCart } from 'react-icons/fi';
import { BiArrowBack } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import styled from "styled-components";
import { FiPlus, FiMinus } from "react-icons/fi"; 

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(145deg, #f0f0f0, #ffffff);
  border-radius: 14px;
  padding: 8px 14px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -3px -3px 8px rgba(255, 255, 255, 0.7);
`;

const QuantityButton = styled.button`
  background: ${(props) => (props.variant === 'add' ? '#1abc9c' : '#e74c3c')};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  transition: all 0.25s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px) scale(1.08);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: scale(0.96);
  }
`;

const QuantityValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  min-width: 30px;
  text-align: center;
  color: #2d3436;
  user-select: none;
`;

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <QuantityControls>
      <QuantityButton variant="remove" onClick={onDecrease}>
        <FiMinus />
      </QuantityButton>
      <QuantityValue>{quantity}</QuantityValue>
      <QuantityButton variant="add" onClick={onIncrease}>
        <FiPlus />
      </QuantityButton>
    </QuantityControls>
  );
};


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
      
      <div className="cart-header">
        <Link to="/">
          <Button 
            type="text" 
            icon={<BiArrowBack size={24} />}
            className="back-button" 
          >
            Back to Products
          </Button>
        </Link>
        <h2 className="cart-title">Cart <FiShoppingCart/></h2>
      </div>
      
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className="product-details">
                    <img 
                        src={item.imageUrl || 'placeholder.jpg'} 
                        alt={item.name} 
                        className="cart-item-image"
                    />
                    {item.name} - ${item.price} 
                </div>
                
                <div className="quantity-controls">
                  <QuantitySelector 
                    quantity={item.quantity}
                    onIncrease={() => increaseQuantity(item.id)}
                    onDecrease={() => decreaseQuantity(item.id)}
                  />

                  <Button 
                    onClick={() => removeFromCart(item.id)}
                    icon={<MdDeleteOutline />}
                    danger 
                    style={{ marginLeft: '10px' , fontSize:'30px'}}
                  >
                  </Button>
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