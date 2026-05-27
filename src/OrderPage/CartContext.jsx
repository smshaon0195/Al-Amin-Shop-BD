import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ADD TO CART
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item._id === product._id);

      if (exist) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  return <CartContext.Provider value={{ cart, addToCart }}>{children}</CartContext.Provider>;
};

export default CartProvider;
