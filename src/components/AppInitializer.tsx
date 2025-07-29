import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserFromStorage } from '../store/userSlice';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize user from localStorage on app start
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        dispatch(setUserFromStorage(userData));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
        dispatch(setUserFromStorage(null));
      }
    } else {
      dispatch(setUserFromStorage(null));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AppInitializer; 