import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function LoginCliente() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  // Limpa login anterior
  useEffect(() => {
    localStorage.removeItem('usuario_cliente');
    delete api.defaults.headers.common['Authorization'];
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const { data } = await api.post('/donos/login', { email, senha });
      localStorage.setItem('usuario_cliente', JSON.stringify(data));
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      navigate('/cliente');
    } catch (err) {
      if (err.response?.status === 401) setErro('Credenciais inválidas.');
      else if (err.response?.status === 404) setErro('Cliente não encontrado.');
      else setErro('Erro ao conectar com o servidor.');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Login do Cliente</h2>
      <Form
        onSubmit={handleLogin}
        className="p-4 rounded shadow bg-white mx-auto"
        style={{ maxWidth: '400px' }}
      >
        {erro && <Alert variant="danger">{erro}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="primary" type="submit">Entrar</Button>
          <Button variant="secondary" onClick={() => navigate('/')}>Voltar</Button>
        </div>
      </Form>
    </Container>
  );
}
