import { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { routes } from './routes';
import NotFoundPage from './pages/NotFoundPage';
import { AnimatePresence, delay, motion } from 'framer-motion';
import ProtectedRoute from './components/General/ProtectedRoute';
import { AppSettingsRepository } from './api/repositories/appSettingsRepository';
import FullscreenLoading from './components/General/FullscreenLoading';

function AnimatedRoutes() {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: { duration: 0.2, ease: 'easeOut', delay: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
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
                  <div>
                    <FullscreenLoading />
                    <ProtectedRoute
                      roles={route.roles}
                      layout={route.layout}
                      component={route.component}
                    />
                  </div>
                }
              />
            ) : (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.layout ? (
                    <route.layout>
                      <FullscreenLoading />
                      <route.component />
                    </route.layout>
                  ) : (
                    <div>
                      <FullscreenLoading />
                      <route.component />
                    </div>
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
      <div style={{ overflow: 'hidden' }}>
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
