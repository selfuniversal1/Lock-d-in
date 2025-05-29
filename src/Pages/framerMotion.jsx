import { motion } from 'framer-motion';
import { colors, spacing } from '../styleConfig';
import { pad, text } from '../styleUtils';

export default function HomePage() {
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
    </motion.div>
  );
}
