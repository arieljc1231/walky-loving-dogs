import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function AdminList() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    api.get('/admins')
      .then(res => setAdmins(res.data))
      .catch(err => console.error('Erro ao buscar admins:', err));
  }, []);

  return (
    <div className="container my-4">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>👩‍💼 Admins Cadastrados</h2>
          <div>
            <Link to="/home" className="btn btn-secondary me-2">← Voltar ao Início</Link>
            <Link to="/admins/novo" className="btn btn-primary">+ Cadastrar Novo Admin</Link>
          </div>
        </div>

        {admins.length === 0 ? (
          <p>Nenhum admin cadastrado ainda.</p>
        ) : (
          <ul className="list-group">
            {admins.map(admin => (
              <Link
                to={`/admins/${admin._id}`}
                key={admin._id}
                className="list-group-item list-group-item-action"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <strong>{admin.nome}</strong> – {admin.email}
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
