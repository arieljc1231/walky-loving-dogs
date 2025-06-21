// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const salvo = localStorage.getItem('usuario');
    if (salvo) setUsuario(JSON.parse(salvo));
  }, []);

  const login = (dados) => {
    localStorage.setItem('usuario', JSON.stringify(dados));
    setUsuario(dados);
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
