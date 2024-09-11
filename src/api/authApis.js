import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Login function
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log('login successfull')
    return response.data; // { message: 'Login successful' }
  } catch (error) {
    console.error('Login error:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Register function
export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    console.log('registration successfull')
    return response.data; // { message: 'Registration successful' }
  } catch (error) {
    console.error('Registration error:', error.response?.data?.message || error.message);
    throw error;
  }
};
