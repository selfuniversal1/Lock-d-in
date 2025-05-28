import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { colors, spacing } from '../styleConfig';
import { pad, text } from '../styleUtils';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        ...pad('lg'),
        backgroundColor: colors.background,
        minHeight: '100vh',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ ...text('xxl', 'bold'), marginBottom: spacing.md }}
      >
        Welcome to Lock<span style={{ color: colors.primary }}>'d</span> In
      </motion.h1>

      <motion.p
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ ...text('base', 'normal'), color: colors.muted }}
      >
        Your trusted place to book professional appointments.
      </motion.p>

      {/* Book Now Button */}
      <motion.button
        onClick={() => navigate('/book')}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        style={{
          marginTop: spacing.lg,
          padding: '12px 32px',
          fontSize: '16px',
          backgroundColor: colors.primary,
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Book Now →
      </motion.button>

      {/* Provider Login Button */}
      <motion.button
        onClick={() => navigate('/provider/login')}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        style={{
          marginTop: spacing.md,
          padding: '12px 32px',
          fontSize: '16px',
          backgroundColor: colors.muted,
          color: '#000',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Provider Login →
      </motion.button>
    </motion.div>
  );
}



