import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiBarChart2 } from "react-icons/fi";

import { useCompare } from "../../context/CompareContext";
import { getImageUrl } from "../../services/api";

const CompareBar = () => {
  const { compareItems, removeFromCompare, clearCompare, maxCompare } = useCompare();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {compareItems.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-brand-dark text-white shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-5 py-4 flex flex-wrap items-center gap-4">

            <div className="flex items-center gap-3 flex-1 min-w-0 overflow-x-auto">
              {compareItems.map((item) => (
                <div key={item.id} className="relative shrink-0">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover border-2 border-white/20"
                  />
                  <button
                    onClick={() => removeFromCompare(item.id)}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
                    aria-label="Remove"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ))}

              {Array.from({ length: Math.max(0, maxCompare - compareItems.length) }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="w-14 h-14 rounded-lg border-2 border-dashed border-white/20 shrink-0"
                />
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={clearCompare}
                className="text-sm text-white/70 hover:text-white transition"
              >
                Clear
              </button>

              <button
                onClick={() => navigate("/compare")}
                disabled={compareItems.length < 2}
                className="inline-flex items-center gap-2 bg-brand-tan text-brand-dark px-6 py-3 rounded-full font-semibold hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FiBarChart2 />
                Compare ({compareItems.length})
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompareBar;
