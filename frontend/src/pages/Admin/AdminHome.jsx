import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminHome() {
  const admin = JSON.parse(localStorage.getItem('usuario_admin')) || {};
  return (
    <div className="container mt-5">
      <h2>Home do Admin</h2>
      <p>Bem-vindo, {admin.nome}!</p>
      <Link to="/login-admin" className="btn btn-secondary">
        Logout
      </Link>
    </div>
  );
}
