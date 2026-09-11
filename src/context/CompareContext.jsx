import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const CompareContext = createContext();

const MAX_COMPARE = 4;

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);

  const isComparing = (id) => compareItems.some((p) => p.id === id);

  const toggleCompare = (product) => {
    setCompareItems((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= MAX_COMPARE) {
        toast.error(`You can compare up to ${MAX_COMPARE} products at a time.`);
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromCompare = (id) => {
    setCompareItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCompare = () => setCompareItems([]);

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        isComparing,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        maxCompare: MAX_COMPARE,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
