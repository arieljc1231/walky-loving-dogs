import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  // Limpa qualquer login anterior
  useEffect(() => {
    localStorage.removeItem('usuario_admin');
    delete api.defaults.headers.common['Authorization'];
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      // POST correto para autenticar
      const { data } = await api.post('/admins/login', { email, senha });
      // Guarda apenas os dados úteis + token
      const userPayload = {
        _id: data._id,
        nome: data.nome,
        email: data.email,
        nivelAcesso: data.nivelAcesso,
        token: data.token
      };
      localStorage.setItem('usuario_admin', JSON.stringify(userPayload));
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      navigate('/home');
    } catch (err) {
      if (err.response?.status === 401) setErro('Credenciais inválidas.');
      else if (err.response?.status === 404) setErro('Administrador não encontrado.');
      else setErro('Erro ao conectar com o servidor.');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Login Administrador</h2>
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
