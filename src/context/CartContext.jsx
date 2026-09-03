import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";
import { useAuthContext } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuthContext() || {};
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load the cart from the backend whenever login state changes.
  useEffect(() => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }

    setLoading(true);
    api
      .get("/cart")
      .then((res) => setCartItems(res.cart.items))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const requireLogin = () => {
    toast.error("Please log in to add items to your cart.");
    navigate("/login");
  };

  // Add Product
  const addToCart = async (product) => {
    if (!isAuthenticated) {
      requireLogin();
      return;
    }

    try {
      const res = await api.post("/cart", {
        productId: product.id,
        quantity: 1,
      });
      setCartItems(res.cart.items);
    } catch (error) {
      toast.error(error.message || "Couldn't add item to cart.");
    }
  };

  // Remove Product
  const removeFromCart = async (id) => {
    if (!isAuthenticated) return;

    try {
      const res = await api.delete(`/cart/${id}`);
      setCartItems(res.cart.items);
    } catch (error) {
      toast.error(error.message || "Couldn't remove item.");
    }
  };

  // Increase Quantity
  const increaseQuantity = async (id) => {
    if (!isAuthenticated) return;

    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    try {
      const res = await api.put(`/cart/${id}`, {
        quantity: item.quantity + 1,
      });
      setCartItems(res.cart.items);
    } catch (error) {
      toast.error(error.message || "Couldn't update quantity.");
    }
  };

  // Decrease Quantity
  const decreaseQuantity = async (id) => {
    if (!isAuthenticated) return;

    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    if (item.quantity <= 1) {
      await removeFromCart(id);
      return;
    }

    try {
      const res = await api.put(`/cart/${id}`, {
        quantity: item.quantity - 1,
      });
      setCartItems(res.cart.items);
    } catch (error) {
      toast.error(error.message || "Couldn't update quantity.");
    }
  };

  // Clear Cart
  const clearCart = async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }

    try {
      const res = await api.delete("/cart");
      setCartItems(res.cart.items);
    } catch (error) {
      toast.error(error.message || "Couldn't clear cart.");
    }
  };

  // Total Quantity
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total Price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        cartLoading: loading,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
