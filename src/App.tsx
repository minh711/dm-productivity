import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

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
  );
}

export default App;
