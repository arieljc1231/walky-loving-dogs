// src/components/RotaProtegidaTutor.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RotaProtegidaTutor = ({ children }) => {
  const usuario = localStorage.getItem('usuario_tutor');
  if (!usuario) {
    alert('Você precisa estar logado como tutor.');
    return <Navigate to="/login-tutor" />;
  }
  return children;
};

export default RotaProtegidaTutor;
