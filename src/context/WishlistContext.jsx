import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";
import { useAuthContext } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuthContext() || {};
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setWishlistItems([]);
      return;
    }

    api
      .get("/wishlist")
      .then((res) => setWishlistItems(res.wishlist))
      .catch(() => {});
  }, [isAuthenticated]);

  const requireLogin = () => {
    toast.error("Please log in to use your wishlist.");
    navigate("/login");
  };

  const addToWishlist = async (product) => {
    if (!isAuthenticated) {
      requireLogin();
      return;
    }

    try {
      const res = await api.post("/wishlist", { productId: product.id });
      setWishlistItems(res.wishlist);
    } catch (error) {
      toast.error(error.message || "Couldn't add to wishlist.");
    }
  };

  const removeFromWishlist = async (id) => {
    if (!isAuthenticated) return;

    try {
      const res = await api.delete(`/wishlist/${id}`);
      setWishlistItems(res.wishlist);
    } catch (error) {
      toast.error(error.message || "Couldn't remove from wishlist.");
    }
  };

  const clearWishlist = async () => {
    if (!isAuthenticated) {
      setWishlistItems([]);
      return;
    }

    try {
      await Promise.all(
        wishlistItems.map((item) => api.delete(`/wishlist/${item.id}`))
      );
      setWishlistItems([]);
    } catch (error) {
      toast.error(error.message || "Couldn't clear wishlist.");
    }
  };

  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
