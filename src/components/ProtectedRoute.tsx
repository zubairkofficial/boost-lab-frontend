import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { H1, BodyText } from './ui/typography';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin';
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = 'user',
  fallbackPath = '/auth/login'
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <H1 className="text-white font-font">Loading...</H1>
          <BodyText className="text-gray-300 font-font">Please wait while we verify your credentials</BodyText>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={fallbackPath} 
        state={{ from: location, message: 'Please sign in to access this page.' }} 
        replace 
      />
    );
  }

  // Check role-based access
  if (user && requiredRole === 'admin' && user.role !== 'admin') {
    return (
      <Navigate 
        to="/auth/dashboard" 
        state={{ message: 'Access denied. Admin privileges required.' }} 
        replace 
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
