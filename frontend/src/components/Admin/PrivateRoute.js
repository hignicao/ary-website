import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');

  return isTokenValid(token) ? children : <Navigate to="/admin" />;
};

export default PrivateRoute;