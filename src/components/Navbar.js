import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * Navbar component for primary application navigation.
 *
 * @param {object} props
 * @param {boolean} props.darkMode The current state of the application theme.
 * @param {Function} props.setDarkMode Function to toggle the application theme between light and dark modes.
 * @param {Function} props.setIsAuthenticated Function to update the user's authentication status.
 * @returns {JSX.Element}
 */
function Navbar({ darkMode, setDarkMode, setIsAuthenticated }) {
  const navigate = useNavigate();

  /**
   * Handles user logout by clearing local storage and updating authentication state.
   */
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 'bold' }} 
          onClick={() => navigate('/home')}
        >
          Movie Explorer
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/home')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/favorites')}>Favorites</Button>
          <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)} sx={{ ml: 1 }}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Button color="inherit" onClick={handleLogout} sx={{ ml: 1 }}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;