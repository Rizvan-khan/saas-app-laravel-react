import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, requiredRole = null }) => {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  // Check if token exists
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check if role is required and user has correct role
  if (requiredRole) {
    if (!user || user.role !== requiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  return element;
};

export default ProtectedRoute;
