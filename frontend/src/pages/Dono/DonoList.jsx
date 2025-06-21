import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function DonoList() {
  const [donos, setDonos] = useState([]);

  useEffect(() => {
    api.get('/donos')
      .then(res => setDonos(res.data))
      .catch(err => console.error('Erro ao buscar donos:', err));
  }, []);

  return (
    <div className="container my-4">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>👤 Donos Cadastrados</h2>
          <div>
            <Link to="/home" className="btn btn-secondary me-2">← Voltar ao Início</Link>
            <Link to="/donos/novo" className="btn btn-primary">+ Cadastrar Novo Dono</Link>
          </div>
        </div>

        {donos.length === 0 ? (
          <p>Nenhum dono cadastrado ainda.</p>
        ) : (
          <ul className="list-group">
            {donos.map(dono => (
              <Link
                to={`/donos/${dono._id}`}
                key={dono._id}
                className="list-group-item list-group-item-action"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <strong>{dono.nome}</strong> – {dono.cpf}
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
