// src/pages/Evento/NovoEventoCliente.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import { Button, Form, Alert } from 'react-bootstrap';

export default function NovoEventoCliente() {
  const navigate = useNavigate();
  const { petId } = useParams();

  const [pet, setPet] = useState(null);
  const [tipo, setTipo] = useState('Hospedagem');
  const [dataEntrada, setDataEntrada] = useState(new Date().toISOString().slice(0, 16));
  const [observacoes, setObservacoes] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.get('/pets/' + petId)
      .then(({ data }) => setPet(data))
      .catch(() => alert('Erro ao carregar pet'));
  }, [petId]);

  const handleSubmit = async e => {
    e.preventDefault();
    setErro('');

    try {
      const tutor = JSON.parse(localStorage.getItem('usuario_tutor'));

      await api.post('/eventos', {
        tipo,
        dataEntrada,
        observacoes,
        pet: petId,
        tutor: tutor._id,
        dono: pet?.dono?._id || pet?.dono, // 🛠️ Correção aqui
        status: 'Ativo',
        admin: null
      });

      navigate('/tutor/home');
    } catch (err) {
      console.error(err);
      setErro('Erro ao salvar.');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Cadastrar Evento (Cliente) para <strong>{pet?.nome}</strong></h3>

      {erro && <Alert variant="danger">{erro}</Alert>}

      <Form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
        <Form.Group className="mb-3">
          <Form.Label>Tipo de Evento</Form.Label>
          <Form.Select value={tipo} onChange={e => setTipo(e.target.value)}>
            <option>Hospedagem</option>
            <option>Passeio</option>
            <option>Banho</option>
            <option>Consulta</option>
            <option>Alimentacao</option>
            <option>Recreacao</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data de Entrada</Form.Label>
          <Form.Control
            type="datetime-local"
            value={dataEntrada}
            onChange={e => setDataEntrada(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Observações</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={observacoes}
            onChange={e => setObservacoes(e.target.value)}
            placeholder="Observações sobre o evento"
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="success" type="submit">Salvar</Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>Voltar</Button>
        </div>
      </Form>
    </div>
  );
}
