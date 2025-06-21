// src/components/RotaProtegidaAdmin.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RotaProtegidaAdmin = ({ children }) => {
  const usuario = localStorage.getItem('usuario_admin');
  if (!usuario) {
    alert('Você precisa estar logado como administrador.');
    return <Navigate to="/login-admin" />;
  }
  return children;
};

export default RotaProtegidaAdmin;
