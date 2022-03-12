import { motion } from "framer-motion";
import "./styles/Page.css";

function Page({ children }) {
  return (
    <motion.section
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3, type: "easeInOut" }}
      /* className="page" */
    >
      {children}
    </motion.section>
  );
}

export default Page;
