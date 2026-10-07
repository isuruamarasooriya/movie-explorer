import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Login from './pages/Login';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import { MovieProvider } from './context/MovieContext';

/**
 * Root component that bootstraps the application routing, theme context, and movie state provider.
 *
 * @returns {JSX.Element}
 */
function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  // Initialize authentication state directly from local storage to prevent redirect race conditions.
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Construct Material-UI theme dynamically based on the current mode toggle.
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MovieProvider>
        <Router>
          {/* Conditionally render Navbar only for authenticated users */}
          {isAuthenticated && (
            <Navbar 
              darkMode={darkMode} 
              setDarkMode={setDarkMode} 
              setIsAuthenticated={setIsAuthenticated} 
            />
          )}
          
          {/* Application Routing Configuration */}
          <Routes>
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/home" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />} 
            />
            <Route 
              path="/home" 
              element={isAuthenticated ? <Home /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/movie/:id" 
              element={isAuthenticated ? <MovieDetails /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/favorites" 
              element={isAuthenticated ? <Favorites /> : <Navigate to="/" replace />} 
            />
          </Routes>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;