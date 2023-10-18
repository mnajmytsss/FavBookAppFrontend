import { useState } from 'react';
import { TextField, Button, Typography, Link, Select, MenuItem, FormControl, InputLabel, Card } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleLoginLinkClick = (e) => {
    e.preventDefault(); 
    window.location.href = '/login';
  }

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://real-tan-caterpillar-boot.cyclic.cloud/auth/register', {
        username,
        password,
        role,
      });

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'You can now log in with your credentials.',
      });

      console.log('Registration successful:', response.data);
      window.location.href = '/login'
    } catch (error) {

      if (error.response && error.response.status === 400 && error.response.data.message) {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'An error occurred during registration. Please try again later.',
        });
      }

      console.error('Registration error:', error.message);
    }
  };


  return (
    <Card style={{ textAlign: 'center', margin: '20px', padding: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Register
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
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          label="Role"
        >
          <MenuItem value="author">Author</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleRegister} style={{ marginTop: '20px'}}>
        Register
      </Button>
      <Typography style={{ marginTop: '10px', paddingTop: '10px' }}>
        <Link href="#" onClick={handleLoginLinkClick} target="_blank" rel="noopener">
          Login here if you already have an account
        </Link>
      </Typography>
    </Card>
  );
};

export default RegisterForm;
