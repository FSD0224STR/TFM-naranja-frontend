import React, { useState, useEffect } from "react";

export const CartContext = React.createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleLAddProductCart = (dataProduct) => {
    const storedCartItems = localStorage.getItem("cartData");
    let cartItems = [];

    if (storedCartItems) {
      try {
        cartItems = JSON.parse(storedCartItems);
        if (Array.isArray(cartItems)) {
          cartItems.push(dataProduct);
          localStorage.setItem("cartData", JSON.stringify(cartItems));
          setCartItems(cartItems);
        }
      } catch (error) {
        console.error("Error parsing cartData from localStorage", error);
        setCartItems([]);
      }
    } else {
      cartItems.push(dataProduct);
      localStorage.setItem("cartData", JSON.stringify(cartItems));
      setCartItems(cartItems);
    }
  };

  const getCartItems = () => {
    const storedCartItems = localStorage.getItem("cartData");

    if (storedCartItems) {
      try {
        const cartItems = JSON.parse(storedCartItems);
        if (Array.isArray(cartItems)) {
          setCartItems(cartItems);
        } else {
          console.error("cartData is not an array");
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error parsing cartData from localStorage", error);
        setCartItems([]);
      }
    }
  };

  const removeCartItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartData", JSON.stringify(updatedCartItems));
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const cartContextValue = {
    handleLAddProductCart,
    cartItems,
    setCartItems,
    getCartItems,
    removeCartItem,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
