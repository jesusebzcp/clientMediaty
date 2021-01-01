import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Section = ({ children }) => {
  return (
    <div className="container">
      <div className="column1" />
      <motion.div
        animate={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className="column2"
      >
        {children}
      </motion.div>
      <div className="column3" />
    </div>
  );
};
Section.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Section;
