import { Alert } from '@mui/material';
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

function SuccessAlert({ isVisible, message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.5 }}
      className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999]"
    >
      <Alert variant="filled" severity="success">
        {message}
      </Alert>
    </motion.div>
  );
}

export default SuccessAlert;
