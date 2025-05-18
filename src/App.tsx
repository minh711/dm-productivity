import { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { routes } from './routes';
import NotFoundPage from './pages/NotFoundPage';
import { AnimatePresence, motion } from 'framer-motion';
import ProtectedRoute from './components/general/ProtectedRoute';
import { AppSettingsRepository } from './api/repositories/appSettingsRepository';

function AnimatedRoutes() {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 40,
      transition: { delay: 0.1 },
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut', delay: 0.1 },
    },
    exit: {
      opacity: 0,
      y: -40,
      transition: { duration: 0.3, ease: 'easeIn', delay: 0.1 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <Routes location={location}>
          {routes.map((route) =>
            route.isProtected ? (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute
                    roles={route.roles}
                    layout={route.layout}
                    component={route.component}
                  />
                }
              />
            ) : (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.layout ? (
                    <route.layout>
                      <route.component />
                    </route.layout>
                  ) : (
                    <route.component />
                  )
                }
              />
            )
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    const applyTheme = async () => {
      const settings = await AppSettingsRepository.getSettings();
      const isDarkMode = settings?.isDarkMode ?? false;
      const html = document.documentElement;

      if (isDarkMode) {
        html.classList.add('dark-mode');
      } else {
        html.classList.remove('dark-mode');
      }
    };

    applyTheme();
  }, []);

  return (
    <Router>
      <div>
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
