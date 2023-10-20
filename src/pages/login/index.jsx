
import { useState } from 'react';
import { TextField, Button, Typography, Link, Card } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegisterLinkClick = (e) => {
    e.preventDefault(); 
    navigate('/');
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://us-central1-revou-fullstack.cloudfunctions.net/week_17_mnajmytsss/auth/login', {
        username,
        password,
      });
      const token = response.data.data;
      localStorage.setItem('token', token);
      console.log('Login successful:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        showConfirmButton: false,
        timer: 1500, 
      });
      navigate('/homepages'); 
    } catch (error) {
      console.error('Login error:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please check your username and password',
      });
    }
  };

  return (
    <Card style={{ textAlign: 'center', margin: '20px', padding: '30px' }}>
      <Typography  variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: '20px'}}>
        Login
      </Button>
      <Typography style={{ marginTop: '10px', paddingTop: '10px' }}>
        <Link href="#" onClick={handleRegisterLinkClick}>
          Register here if you dont have an account
        </Link>
      </Typography>
    </Card>
  );
};

export default LoginForm;
