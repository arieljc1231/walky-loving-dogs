// src/pages/Dono/DonoDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function DonoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dono, setDono] = useState(null);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // busca dono
    api.get(`/donos/${id}`)
      .then(response => setDono(response.data))
      .catch(error => {
        console.error('Erro ao buscar dono:', error);
        navigate('/donos');
      });

    // busca todos os pets e filtra apenas os do dono
    api.get('/pets')
      .then(response => {
        const allPets = response.data;
        const myPets = allPets.filter(pet => String(pet.dono) === id);
        setPets(myPets);
      })
      .catch(error => console.error('Erro ao buscar pets do dono:', error));
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este dono?')) {
      await api.delete(`/donos/${id}`);
      navigate('/donos');
    }
  };

  if (!dono) return <p>Carregando...</p>;

  return (
    <div className="container my-5">
      <div className="p-4 border rounded shadow-sm bg-white mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Detalhes do Dono</h2>
          <div>
            <Link to="/home" className="btn btn-secondary me-2">← Voltar ao Início</Link>
            <Link to="/donos" className="btn btn-dark">Ver Donos</Link>
          </div>
        </div>

        <ul className="list-group mb-3">
          <li className="list-group-item"><strong>Nome:</strong> {dono.nome}</li>
          <li className="list-group-item"><strong>CPF:</strong> {dono.cpf}</li>
          <li className="list-group-item"><strong>Endereço:</strong> {dono.endereco}</li>
          <li className="list-group-item"><strong>Telefone:</strong> {dono.telefone}</li>
          <li className="list-group-item"><strong>Email:</strong> {dono.email}</li>
          <li className="list-group-item">
            <strong>Data de Nascimento:</strong> {new Date(dono.dataNascimento).toLocaleDateString('pt-BR')}
          </li>
          <li className="list-group-item">
            <strong>Responsável:</strong> {dono.responsavel ? 'Sim' : 'Não'}
          </li>
          <li className="list-group-item">
            <strong>Ativo:</strong> {dono.ativo ? 'Sim' : 'Não'}
          </li>
          <li className="list-group-item">
            <strong>Observações:</strong> {dono.observacoes || '—'}
          </li>
          <li className="list-group-item">
            <strong>Data de Cadastro:</strong> {new Date(dono.dataCadastro).toLocaleDateString('pt-BR')}
          </li>
        </ul>

        <button
          className="btn btn-warning me-2"
          onClick={() => navigate(`/donos/${id}/editar`)}
        >
          Editar
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Excluir
        </button>
      </div>

      {/* Lista de Pets do dono */}
      <div className="p-4 border rounded shadow-sm bg-white">
        <h4 className="mb-3">Pets cadastrados</h4>
        {pets.length === 0 ? (
          <p>Nenhum pet cadastrado para este dono.</p>
        ) : (
          <ul className="list-group">
            {pets.map(pet => (
              <li
                key={pet._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{pet.nome}</strong> — {pet.especie}, {pet.raca}
                </div>
                <Link to={`/pets/${pet._id}`} className="btn btn-sm btn-outline-primary">
                  Ver Detalhes
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}