import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

export default function EditarAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', email: '', senha: '', nivelAcesso: '' });
  const [erro, setErro] = useState(null);

  useEffect(() => {
    api.get(`/admins/${id}`)
      .then(r => setForm(r.data))
      .catch(err => console.error('Erro ao carregar admin:', err));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.put(`/admins/${id}`, form);
      navigate('/admins');
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao atualizar admin');
    }
  };

  return (
    <div className="container my-5">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Editar Admin</h2>
          <div>
            <Link to="/home" className="btn btn-secondary me-2">← Voltar ao Início</Link>
            <Link to="/admins" className="btn btn-dark">Ver Admins</Link>
          </div>
        </div>

        {erro && <div className="alert alert-danger">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input name="nome" className="form-control" value={form.nome} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input name="senha" type="password" className="form-control" value={form.senha} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Nível de Acesso</label>
            <select name="nivelAcesso" className="form-select" value={form.nivelAcesso} onChange={handleChange}>
              <option value="">Selecione...</option>
              <option value="admin">Admin</option>
              <option value="colaborador">Colaborador</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success">Salvar Alterações</button>
        </form>
      </div>
    </div>
  );
}
