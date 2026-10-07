import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * Login page component providing a mock authentication gateway.
 *
 * @param {object} props
 * @param {Function} props.setIsAuthenticated State setter to update the global authentication status.
 * @returns {JSX.Element}
 */
function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  /**
   * Handles user submission of the login form. 
   * Sets mock auth state in local storage upon valid credentials.
   *
   * @param {Event} e The form submission event.
   */
  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      localStorage.setItem('isLoggedIn', 'true');
      setIsAuthenticated(true);
      navigate('/home');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 12 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
          Movie Explorer Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
          <TextField 
            fullWidth margin="normal" label="Username" required 
            value={username} onChange={(e) => setUsername(e.target.value)} 
          />
          <TextField 
            fullWidth margin="normal" label="Password" type="password" required 
            value={password} onChange={(e) => setPassword(e.target.value)} 
          />
          <Button fullWidth type="submit" variant="contained" size="large" sx={{ mt: 3 }}>
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;