import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import BookingForm from './Pages/BookingForm.jsx';
import SuccessPage from './Pages/SuccessPage.jsx';
import FailurePage from './Pages/FailurePage.jsx';
import HomePage from './Pages/HomePage.jsx';
import ProviderLogin from './Pages/Providers/ProviderLogin.jsx';
import ProviderDashboard from './Pages/Providers/ProviderDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute';

export default function AnimatedRoutes() {
  const location = useLocation();

  const wrapper = (Component) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Component />
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={wrapper(HomePage)} />
        <Route path="/book" element={wrapper(BookingForm)} />
        <Route path="/success" element={wrapper(SuccessPage)} />
        <Route path="/failure" element={wrapper(FailurePage)} />
        <Route path="/provider-login" element={wrapper(ProviderLogin)} />

        <Route
          path="/provider-dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin', 'provider']}>
              {wrapper(ProviderDashboard)}
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

