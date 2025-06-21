// src/components/RotaProtegidaCliente.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RotaProtegidaCliente = ({ children }) => {
  const usuario = localStorage.getItem('usuario_cliente');
  if (!usuario) {
    alert('Você precisa estar logado como cliente.');
    return <Navigate to="/login-cliente" />;
  }
  return children;
};

export default RotaProtegidaCliente;
