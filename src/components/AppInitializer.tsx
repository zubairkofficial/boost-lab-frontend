import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserFromStorage, setUserInfoFromStorage } from '../store/userSlice';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize user from localStorage on app start
    const storedUser = localStorage.getItem('user');
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUser && storedUserInfo) {
      try {
        const userData = JSON.parse(storedUser);
        const userInfoData = JSON.parse(storedUserInfo);
        dispatch(setUserFromStorage(userData));
        dispatch(setUserInfoFromStorage(userInfoData));
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