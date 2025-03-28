import { Alert } from '@mui/material';
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

function ErrorAlert({ isVisible, validationErrors }) {
  if (!isVisible) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.5 }}
      className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999]"
    >
      <Alert variant="filled" severity="error">
        <ul>
          {validationErrors &&
            validationErrors.map((err, index) => (
              <li key={index} style={{ color: 'white' }}>
                - {err.msg}
              </li>
            ))}
        </ul>
      </Alert>
    </motion.div>
  );
}

export default ErrorAlert;
