// src/pages/PetList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get('/pets')
      .then(response => setPets(response.data))
      .catch(error => console.error('Erro ao buscar pets:', error));
  }, []);

  return (
    <div className="container my-4">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>🐾 Pets Cadastrados</h2>
          <div>
            <Link to="/home" className="btn btn-secondary me-2">← Voltar ao Início</Link>
            <Link to="/pets/novo" className="btn btn-primary">+ Cadastrar Novo Pet</Link>
          </div>
        </div>

        {pets.length === 0 ? (
          <p>Nenhum pet cadastrado ainda.</p>
        ) : (
          <ul className="list-group">
            {pets.map(pet => (
              <Link
                to={`/pets/${pet._id}`}
                key={pet._id}
                className="list-group-item list-group-item-action"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <strong>{pet.nome}</strong> – {pet.raca} – {pet.porte}
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
