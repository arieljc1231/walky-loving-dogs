import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const tipos = [
  { value: 'Hospedagem', label: 'Hospedagem' },
  { value: 'Passeio', label: 'Passeio' },
  { value: 'Banho', label: 'Banho & Tosa' },
  { value: 'Consulta', label: 'Consulta Veterinária' },
  { value: 'Alimentacao', label: 'Alimentação' },
  { value: 'Recreacao', label: 'Recreação' },
];

export default function NovoEvento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('Hospedagem');
  const [dataEntrada, setDataEntrada] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [erro, setErro] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/eventos/checkin', {
        tipo,
        pet: id,
        dataEntrada: new Date(dataEntrada).toISOString(),
        observacoes,
      });
      navigate(`/pets/${id}`);
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao registrar evento');
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Novo Evento para o Pet</h2>
        <div>
          <Link to="/" className="btn btn-outline-secondary me-2">Voltar ao Início</Link>
          <Link to={`/pets/${id}`} className="btn btn-secondary">Ver Pet</Link>
        </div>
      </div>

      {erro && <div className="alert alert-danger">{erro}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tipo de Evento</label>
          <select className="form-select" value={tipo} onChange={e => setTipo(e.target.value)}>
            {tipos.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Data e Hora de Entrada</label>
          <input type="datetime-local" className="form-control" value={dataEntrada} onChange={e => setDataEntrada(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Observações</label>
          <textarea className="form-control" rows="3" value={observacoes} onChange={e => setObservacoes(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-success">Salvar Evento</button>
      </form>
    </div>
  );
}
