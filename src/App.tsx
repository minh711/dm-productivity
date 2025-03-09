import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { routes } from './routes';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import * as electron from 'electron';
import { Button, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './style.module.css';
import { AnimatePresence, motion } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <AnimatePresence mode="sync">
      <Routes location={location} key={location.pathname}>
        {routes.map((route) =>
          route.isProtected ? (
            <Route
              key={route.path}
              path={route.path}
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                >
                  <ProtectedRoute
                    roles={route.roles}
                    layout={route.layout}
                    component={route.component}
                  />
                </motion.div>
              }
            />
          ) : (
            <Route
              key={route.path}
              path={route.path}
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                >
                  {route.layout ? (
                    <route.layout>
                      <route.component />
                    </route.layout>
                  ) : (
                    <route.component />
                  )}
                </motion.div>
              }
            />
          )
        )}
        <Route
          path="*"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
              <NotFoundPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedDarkMode = localStorage.getItem('isDarkMode');
    return savedDarkMode === 'true';
  });

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }

    localStorage.setItem('isDarkMode', isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <Router>
      <div>
        <div className={classNames(styles.menu)}>
          <Tooltip title="Go Back" placement="topLeft">
            <Button
              icon={<LeftOutlined />}
              onClick={() => window.electron.goBack()}
              className={classNames('me-sm')}
              style={{ borderRadius: '50%' }}
            />
          </Tooltip>
          <Tooltip title="Go Forward" placement="topLeft">
            <Button
              icon={<RightOutlined />}
              onClick={() => window.electron.goForward()}
              style={{ borderRadius: '50%' }}
            />
          </Tooltip>
        </div>
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
