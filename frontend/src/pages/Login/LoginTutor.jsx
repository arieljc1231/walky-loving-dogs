// src/pages/Login/LoginTutor.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function LoginTutor() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    setErro('');
    try {
      const { data } = await api.post('/tutores/login', { email, senha });
      // armazena token e dados essenciais
      const payload = {
        _id: data._id,
        nome: data.nome,
        email: data.email,
        token: data.token
      };
      localStorage.setItem('usuario_tutor', JSON.stringify(payload));
      // seta o header
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      navigate('/tutor/home');
    } catch (err) {
      setErro(err.response?.data?.message || 'Erro ao conectar com o servidor.');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Login Tutor</h2>
      <Form onSubmit={handleLogin} className="p-4 rounded shadow bg-white mx-auto" style={{ maxWidth: '400px' }}>
        {erro && <Alert variant="danger">{erro}</Alert>}
        <Form.Group className="mb-3" controlId="emailTutor">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Digite seu email" value={email}
            onChange={e => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="senhaTutor">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" placeholder="Digite sua senha" value={senha}
            onChange={e => setSenha(e.target.value)} required />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button variant="primary" type="submit">Entrar</Button>
          <Button variant="secondary" onClick={() => navigate('/')}>Voltar</Button>
        </div>
      </Form>
    </Container>
  );
}
