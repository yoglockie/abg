// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Element, ...props }) => {
  const { authenticated } = useAuth();

  return authenticated ? (
    <Route {...props} element={<Element />} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
