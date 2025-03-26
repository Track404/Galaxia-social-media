import { Alert } from '@mui/material';
import { motion } from 'framer-motion';

function ErrorAlert({ isVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.5 }}
      className="absolute top-2 left-1/2 transform -translate-x-1/2"
    >
      <Alert variant="filled" severity="error">
        Error when creating Post
      </Alert>
    </motion.div>
  );
}

export default ErrorAlert;
