// src/pages/Tutor/NovoTutor.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const NovoTutor = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    endereco: '',
    telefone: '',
    email: '',
    dataNascimento: '',
    senha: '',
    ativo: true,
    observacoes: ''
  });
  const [errors, setErrors] = useState({});

  const formatarCPF = valor => {
    const numerico = valor.replace(/\D/g, '').slice(0, 11);
    return numerico
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatarTelefone = valor =>
    valor
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    let val = type === 'checkbox' ? checked : value;

    if (name === 'cpf') val = formatarCPF(val);
    if (name === 'telefone') val = formatarTelefone(val);

    setForm(f => ({ ...f, [name]: val }));
    setErrors(err => ({ ...err, [name]: null }));
  };

  const validate = () => {
    const errs = {};
    const cpfNums = form.cpf.replace(/\D/g, '');
    const telNums = form.telefone.replace(/\D/g, '');

    if (!form.nome.trim() || !/^[A-Za-zÀ-ÿ\s]+$/.test(form.nome))
      errs.nome = 'Nome deve conter apenas letras';
    if (cpfNums.length !== 11) errs.cpf = 'CPF deve conter exatamente 11 números';
    if (!form.endereco.trim()) errs.endereco = 'Endereço é obrigatório';
    if (telNums.length < 10 || telNums.length > 11)
      errs.telefone = 'Telefone deve ter DDD + número (10 ou 11 dígitos)';
    if (!form.email.trim() || !form.email.includes('@'))
      errs.email = 'Email inválido';
    if (!form.dataNascimento) errs.dataNascimento = 'Data de nascimento inválida';
    if (!form.senha || form.senha.length < 6)
      errs.senha = 'Senha deve conter pelo menos 6 caracteres';

    return errs;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const v = validate();
    setErrors(v);

    if (Object.keys(v).length === 0) {
      try {
        await api.post('/tutores', form);
        navigate('/tutores');
      } catch (err) {
        const resp = err.response?.data;
        if (resp?.erros) {
          const fieldErrors = resp.erros.reduce(
            (acc, cur) => ({ ...acc, [cur.path]: cur.msg }),
            {}
          );
          setErrors(fieldErrors);
        } else {
          setErrors({ form: resp?.erro || 'Erro ao cadastrar tutor' });
        }
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Cadastrar Novo Tutor</h2>
          <div>
            <Link to="/home" className="btn btn-secondary me-2">← Voltar ao Início</Link>
            <Link to="/tutores" className="btn btn-dark">Ver Tutores</Link>
          </div>
        </div>

        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Nome:</label>
            <input
              name="nome"
              className="form-control"
              value={form.nome}
              onChange={handleChange}
            />
            {errors.nome && <div className="text-danger">{errors.nome}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">CPF:</label>
            <input
              name="cpf"
              className="form-control"
              value={form.cpf}
              onChange={handleChange}
            />
            {errors.cpf && <div className="text-danger">{errors.cpf}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Endereço:</label>
            <input
              name="endereco"
              className="form-control"
              value={form.endereco}
              onChange={handleChange}
            />
            {errors.endereco && <div className="text-danger">{errors.endereco}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Telefone:</label>
            <input
              name="telefone"
              className="form-control"
              value={form.telefone}
              onChange={handleChange}
            />
            {errors.telefone && <div className="text-danger">{errors.telefone}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Senha:</label>
            <input
              name="senha"
              type="password"
              className="form-control"
              value={form.senha}
              onChange={handleChange}
            />
            {errors.senha && <div className="text-danger">{errors.senha}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Data de Nascimento:</label>
            <input
              name="dataNascimento"
              type="date"
              className="form-control"
              value={form.dataNascimento}
              onChange={handleChange}
            />
            {errors.dataNascimento && <div className="text-danger">{errors.dataNascimento}</div>}
          </div>

          <div className="form-check mb-3">
            <input
              name="ativo"
              type="checkbox"
              className="form-check-input"
              checked={form.ativo}
              onChange={handleChange}
            />
            <label className="form-check-label">Ativo</label>
          </div>

          <div className="mb-3">
            <label className="form-label">Observações:</label>
            <textarea
              name="observacoes"
              className="form-control"
              rows={3}
              value={form.observacoes}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success">Cadastrar Tutor</button>
        </form>
      </div>
    </div>
  );
};

export default NovoTutor;