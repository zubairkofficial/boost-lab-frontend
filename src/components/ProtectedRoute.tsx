import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { H1, BodyText } from './ui/typography';
import { selectUser, selectIsAuthenticated, selectIsLoading } from '../store/userSlice';

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
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log("isAuthenticated",isAuthenticated)
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();

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
        to="/dashboard" 
        state={{ message: 'Access denied. Admin privileges required.' }} 
        replace 
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
