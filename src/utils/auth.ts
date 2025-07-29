import { store } from '../store';
import { clearUser } from '../store/userSlice';

export const logout = () => {
  // Clear from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  
  // Clear from Redux store
  store.dispatch(clearUser());
};

export const getStoredUser = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      localStorage.removeItem('user');
      return null;
    }
  }
  return null;
};

export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

export const isAuthenticated = () => {
  return !!getAccessToken() && !!getStoredUser();
}; 