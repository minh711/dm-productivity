import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import * as electron from 'electron';
import { Button, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './style.module.css';

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

      <Router>
        <Routes>
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
      </Router>
    </div>
  );
}

export default App;
