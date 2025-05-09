// src/services/authService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Axios instance dengan interceptor
const api = axios.create({
  baseURL: API_URL
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Register new user
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Terjadi kesalahan. Silakan coba lagi.' };
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    
    if (response.data.success) {
      // Simpan token dan user data ke localStorage
      localStorage.setItem('authToken', response.data.session.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login gagal. Periksa email dan password Anda.' };
  }
};

// Logout user
export const logout = async () => {
  try {
    await api.post('/auth/logout');
    
    // Hapus data dari localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    return { success: true };
  } catch (error) {
    throw error.response?.data || { message: 'Logout gagal.' };
  }
};

// Get current user info
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/user');
    return response.data.user;
  } catch (error) {
    throw error.response?.data || { message: 'Gagal mendapatkan data user.' };
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    const response = await api.post('/auth/reset-password', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Reset password gagal.' };
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

// Get user from localStorage
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Export auth service
const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  resetPassword,
  isAuthenticated,
  getUser
};

export default authService;