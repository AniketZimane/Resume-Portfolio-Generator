import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Set the token in axios headers
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Get the current user from the API
          try {
            const response = await axios.get('http://localhost:5000/api/auth/me');
            setCurrentUser(response.data.user);
          } catch (apiError) {
            console.error('Failed to get user data:', apiError);
            // Token might be invalid, clear it
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
          }
        }
      } catch (err) {
        console.error('Authentication error:', err);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      
      // Use the real backend API
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setCurrentUser(user);
      toast.success('Login successful!');
      return true;
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      
      console.log('Registering user with data:', {
        name: userData.name,
        email: userData.email,
        password: userData.password ? '********' : undefined
      });
      
      // Use the real backend API
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Registration response:', response.data);
      toast.success('Registration successful! Please log in.');
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Call the logout API endpoint
      if (currentUser) {
        await axios.post('http://localhost:5000/api/auth/logout');
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Always clear local storage and state
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setCurrentUser(null);
      toast.info('You have been logged out');
    }
  };

  const updateProfile = async (userData) => {
    try {
      setError(null);
      
      // Use the real backend API
      const response = await axios.put('http://localhost:5000/api/users/profile', userData);
      
      setCurrentUser(response.data.user);
      toast.success('Profile updated successfully!');
      return true;
    } catch (err) {
      console.error('Profile update error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Profile update failed';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};