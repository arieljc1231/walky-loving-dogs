import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function AdminDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    api.get(`/admins/${id}`)
      .then(response => setAdmin(response.data))
      .catch(error => console.error('Erro ao buscar admin:', error));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este admin?')) {
      await api.delete(`/admins/${id}`);
      navigate('/admins');
    }
  };

  if (!admin) return <p>Carregando...</p>;

  return (
    <div className="container my-5">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Detalhes do Admin</h2>
          <div>
            <Link to="/home" className="btn btn-secondary me-2">← Voltar ao Início</Link>
            <Link to="/admins" className="btn btn-dark">Ver Admins</Link>
          </div>
        </div>

        <ul className="list-group mb-3">
          <li className="list-group-item"><strong>Nome:</strong> {admin.nome}</li>
          <li className="list-group-item"><strong>Email:</strong> {admin.email}</li>
          <li className="list-group-item"><strong>Nível de Acesso:</strong> {admin.nivelAcesso}</li>
          <li className="list-group-item"><strong>Ativo:</strong> {admin.ativo ? 'Sim' : 'Não'}</li>
          <li className="list-group-item"><strong>Data de Cadastro:</strong> {new Date(admin.dataCadastro).toLocaleDateString()}</li>
        </ul>

        <button className="btn btn-warning me-2" onClick={() => navigate(`/admins/${id}/editar`)}>Editar</button>
        <button className="btn btn-danger" onClick={handleDelete}>Excluir</button>
      </div>
    </div>
  );
}