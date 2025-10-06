import React, { createContext, useReducer, useContext, useEffect } from "react";

const CartContext = createContext();
const CART_STORAGE_KEY = 'v_ecom_cart_mern';

const loadInitialState = () => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? { cartItems: JSON.parse(storedCart) } : { cartItems: [] };
  } catch (error) {
    console.error("Failed to load cart from localStorage", error);
    return { cartItems: [] };
  }
};

const cartReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        newState = {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        newState = {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
      break;

    case "REMOVE_FROM_CART":
      newState = {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
      break;

    case "INCREASE_QUANTITY":
      newState = {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
      break;

    case "DECREASE_QUANTITY":
      newState = {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.id === action.payload && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
      break;

    case "CLEAR_CART":
      newState = { ...state, cartItems: [] };
      break;

    default:
      return state;
  }
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState.cartItems));
  } catch (error) {
    console.error("Failed to save cart to localStorage", error);
  }

  return newState;
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {}, loadInitialState);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const increaseQuantity = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);