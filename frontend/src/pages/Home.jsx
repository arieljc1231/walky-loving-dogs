import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario_admin');
    navigate('/');
  };

  return (
    <div style={wrapperStyle}>
      <div style={logoutStyle}>
        <button onClick={handleLogout} style={logoutButtonStyle}>Sair</button>
      </div>
      <div style={cardStyle}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#663399' }}>🐾 Walky Loving Dogs</h1>
        <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
          Aplicação de Creche para Cachorros
        </p>

        <div style={buttonContainerStyle}>
          <Link to="/pets" style={buttonStyle('#007bff')}>Ver Pets</Link>
          <Link to="/admins" style={buttonStyle('#17a2b8')}>Ver Admins</Link>
          <Link to="/donos" style={buttonStyle('#6f42c1')}>Ver Donos</Link>
          <Link to="/tutores" style={buttonStyle('#28a745')}>Ver Tutores</Link>
        </div>
      </div>
    </div>
  );
};

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(to bottom right, #f0f4f8, #ffffff)',
  fontFamily: 'Arial, sans-serif',
  padding: '1rem',
  position: 'relative'
};

const logoutStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px'
};

const logoutButtonStyle = {
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  padding: '10px 16px',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const cardStyle = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '16px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  maxWidth: '600px',
  width: '100%'
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '1rem'
};

const buttonStyle = (color) => ({
  padding: '10px 20px',
  backgroundColor: color,
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: 'bold',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  transition: 'opacity 0.3s',
  textAlign: 'center'
});

export default Home;
