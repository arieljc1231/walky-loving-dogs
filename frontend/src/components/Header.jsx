
// src/components/Header.jsx
import React from 'react';

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/login'; // recarrega completamente a aplicação
  };

  return (
    <header className="d-flex justify-content-end p-3 bg-light border-bottom">
      <button onClick={handleLogout} className="btn btn-danger">
        Sair
      </button>
    </header>
  );
};

export default Header;
