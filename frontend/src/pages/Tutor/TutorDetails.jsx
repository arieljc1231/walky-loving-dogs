import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function TutorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);

  useEffect(() => {
    api.get(`/tutores/${id}`)
      .then(response => setTutor(response.data))
      .catch(error => console.error('Erro ao buscar tutor:', error));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este tutor?')) {
      await api.delete(`/tutores/${id}`);
      navigate('/tutores');
    }
  };

  if (!tutor) return <p>Carregando...</p>;

  return (
    <div className="container my-5">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Detalhes do Tutor</h2>
          <div>
            <Link to="/home" className="btn btn-secondary me-2">← Voltar ao Início</Link>
            <Link to="/tutores" className="btn btn-dark">Ver Tutores</Link>
          </div>
        </div>

        <ul className="list-group mb-3">
          <li className="list-group-item"><strong>Nome:</strong> {tutor.nome}</li>
          <li className="list-group-item"><strong>Email:</strong> {tutor.email}</li>
          <li className="list-group-item"><strong>CPF:</strong> {tutor.cpf}</li>
          <li className="list-group-item"><strong>Telefone:</strong> {tutor.telefone}</li>
          <li className="list-group-item"><strong>Endereço:</strong> {tutor.endereco}</li>
          <li className="list-group-item"><strong>Data de Nascimento:</strong> {new Date(tutor.dataNascimento).toLocaleDateString()}</li>
          <li className="list-group-item"><strong>Observações:</strong> {tutor.observacoes}</li>
          <li className="list-group-item"><strong>Ativo:</strong> {tutor.ativo ? 'Sim' : 'Não'}</li>
        </ul>


        <button className="btn btn-warning me-2" onClick={() => navigate(`/tutores/${id}/editar`)}>Editar</button>
        <button className="btn btn-danger" onClick={handleDelete}>Excluir</button>
      </div>
    </div>
  );
}