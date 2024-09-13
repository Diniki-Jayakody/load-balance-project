import axios from 'axios';
import BASE_URL from '../config'; 

const API_URL = `${BASE_URL}`;

// Login function
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log('login successfull')
    const token = response.data.data.token; 
    localStorage.setItem('token', token);
    
    return response.data; 
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
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data?.message || error.message);
    throw error;
  }
};
