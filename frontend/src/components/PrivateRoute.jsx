import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, role }) {
  const key = `usuario_${role}`;
  const auth = JSON.parse(localStorage.getItem(key));
  return auth && auth._id
    ? children
    : <Navigate to={`/login-${role}`} replace />;
}
