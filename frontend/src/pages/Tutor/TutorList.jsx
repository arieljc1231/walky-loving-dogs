import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function TutorList() {
  const [tutores, setTutores] = useState([]);

  useEffect(() => {
    api.get('/tutores')
      .then(res => setTutores(res.data))
      .catch(err => console.error('Erro ao buscar tutores:', err));
  }, []);

  return (
    <div className="container my-4">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>👥 Tutores Cadastrados</h2>
          <div>
            <Link to="/home" className="btn btn-secondary me-2">← Voltar ao Início</Link>
            <Link to="/tutores/novo" className="btn btn-primary">+ Cadastrar Novo Tutor</Link>
          </div>
        </div>

        {tutores.length === 0 ? (
          <p>Nenhum tutor cadastrado ainda.</p>
        ) : (
          <ul className="list-group">
            {tutores.map(tutor => (
              <Link
                to={`/tutores/${tutor._id}`}
                key={tutor._id}
                className="list-group-item list-group-item-action"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <strong>{tutor.nome}</strong> – {tutor.cpf}
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
