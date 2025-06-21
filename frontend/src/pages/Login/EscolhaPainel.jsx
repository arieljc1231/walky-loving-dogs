/* ===== src/pages/Login/EscolhaPainel.jsx ===== */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

export default function EscolhaPainel() {
  const navigate = useNavigate();

  return (
    <Container className="mt-5 text-center">
      <h2>Escolha o tipo de acesso</h2>
      <div className="d-flex justify-content-center mt-4" style={{ gap: '1rem' }}>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/login-admin')}
        >
          Painel Admin
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate('/login-cliente')}
        >
          Painel Cliente
        </Button>
        <Button
          variant="info"
          size="lg"
          onClick={() => navigate('/login-tutor')}
        >
          Painel Tutor
        </Button>
      </div>
    </Container>
  );
}
