import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // Importação padrão para compatibilidade

const PrivateRoute = ({ children }) => {
  // 1. Pega o token correto (antes estava 'adminToken', agora é 'token')
  const token = localStorage.getItem('token');

  // 2. Se não tem token, redireciona
  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  try {
    // 3. Decodifica e verifica validade
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      // Token expirado
      localStorage.removeItem('token');
      return <Navigate to="/admin" replace />;
    }

    // Token válido
    return children;

  } catch (error) {
    // Token inválido ou corrompido
    localStorage.removeItem('token');
    return <Navigate to="/admin" replace />;
  }
};

export default PrivateRoute;