
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const NovoAdmin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    nivelAcesso: '',
  });

  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErros({ ...erros, [e.target.name]: '' }); // Limpa erro ao digitar
  };

  const validarCampos = () => {
    const novosErros = {};
    if (!form.nome) novosErros.nome = 'Nome é obrigatório.';
    if (!form.email) novosErros.email = 'Email é obrigatório.';
    if (!form.senha) novosErros.senha = 'Senha é obrigatória.';
    if (!form.nivelAcesso) novosErros.nivelAcesso = 'Nível de Acesso é obrigatório.';
    return novosErros;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validacao = validarCampos();
    if (Object.keys(validacao).length > 0) {
      setErros(validacao);
      return;
    }

    try {
      await api.post('/admins', form);
      navigate('/admins');
    } catch (error) {
      const resp = error.response?.data;
      if (resp?.erros) {
        const fieldErrors = resp.erros.reduce(
          (acc, cur) => ({ ...acc, [cur.path]: cur.msg }), {}
        );
        setErros(fieldErrors);
      } else {
        alert(resp?.erro || 'Erro ao cadastrar admin.');
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Cadastrar Novo Admin</h3>
          <div>
            <Link to="/home" className="btn btn-secondary me-2">Voltar ao Início</Link>
            <Link to="/admins" className="btn btn-dark">Ver Admins</Link>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              className="form-control"
              value={form.nome}
              onChange={handleChange}
            />
            {erros.nome && <div className="text-danger">{erros.nome}</div>}
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
            {erros.email && <div className="text-danger">{erros.email}</div>}
          </div>

          <div className="mb-3">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              className="form-control"
              value={form.senha}
              onChange={handleChange}
            />
            {erros.senha && <div className="text-danger">{erros.senha}</div>}
          </div>

          <div className="mb-3">
            <label>Nível de Acesso</label>
            <select
              name="nivelAcesso"
              className="form-select"
              value={form.nivelAcesso}
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              <option value="admin">Admin</option>
              <option value="colaborador">Colaborador</option>
              <option value="super">Super</option>
            </select>
            {erros.nivelAcesso && <div className="text-danger">{erros.nivelAcesso}</div>}
          </div>

          <div>
            <button type="submit" className="btn btn-success">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovoAdmin;
