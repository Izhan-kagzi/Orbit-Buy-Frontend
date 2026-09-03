import { motion } from "framer-motion";

// Reusable scroll-triggered fade/slide-up wrapper. Wrap any section or
// element in this to give it a subtle entrance animation the first
// time it scrolls into view.
const FadeIn = ({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
  className = "",
  once = true,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
