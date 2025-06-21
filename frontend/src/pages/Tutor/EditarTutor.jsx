// src/pages/Tutor/EditarTutor.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function EditarTutor() {
  const { id } = useParams();
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

  useEffect(() => {
    api.get(`/tutores/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error('Erro ao carregar tutor:', err));
  }, [id]);

  const formatarCPF = valor => valor
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  const formatarTelefone = valor => valor
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
    const errObj = {};
    const cpfNums = form.cpf.replace(/\D/g, '');
    const telNums = form.telefone.replace(/\D/g, '');
    if (!form.nome.trim()) errObj.nome = 'Nome é obrigatório';
    else if (!/^[A-Za-zÀ-ú\s]+$/.test(form.nome)) errObj.nome = 'Use apenas letras no nome';
    if (cpfNums.length !== 11) errObj.cpf = 'CPF deve ter 11 dígitos';
    if (!form.endereco.trim()) errObj.endereco = 'Endereço é obrigatório';
    if (telNums.length < 10 || telNums.length > 11) errObj.telefone = 'Telefone inválido';
    if (!form.email.trim() || !form.email.includes('@')) errObj.email = 'Email inválido';
    if (!form.dataNascimento) errObj.dataNascimento = 'Data de nascimento obrigatória';
    if (form.senha && form.senha.length > 0 && form.senha.length < 6)
      errObj.senha = 'Senha deve ter ao menos 6 caracteres';
    return errObj;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const v = validate(); setErrors(v);
    if (Object.keys(v).length === 0) {
      try { await api.put(`/tutores/${id}`, form); navigate('/tutores'); }
      catch (err) {
        const resp = err.response?.data;
        if (resp?.erros) setErrors(resp.erros.reduce((a,c) => ({...a,[c.path]:c.msg}), {}));
        else setErrors({ form: resp?.erro || 'Erro ao atualizar tutor' });
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Editar Tutor</h2>
          <div>
            <Link to="/home" className="btn btn-secondary me-2">← Voltar ao Início</Link>
            <Link to="/tutores" className="btn btn-dark">Ver Tutores</Link>
          </div>
        </div>

        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Nome:</label>
            <input name="nome" className="form-control" value={form.nome} onChange={handleChange}/>
            {errors.nome && <div className="text-danger">{errors.nome}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">CPF:</label>
            <input name="cpf" className="form-control" value={form.cpf} onChange={handleChange}/>
            {errors.cpf && <div className="text-danger">{errors.cpf}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Endereço:</label>
            <input name="endereco" className="form-control" value={form.endereco} onChange={handleChange}/>
            {errors.endereco && <div className="text-danger">{errors.endereco}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Telefone:</label>
            <input name="telefone" className="form-control" value={form.telefone} onChange={handleChange}/>
            {errors.telefone && <div className="text-danger">{errors.telefone}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange}/>
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Senha:</label>
            <input name="senha" type="password" className="form-control" value={form.senha} onChange={handleChange}/>
            {errors.senha && <div className="text-danger">{errors.senha}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Data de Nascimento:</label>
            <input name="dataNascimento" type="date" className="form-control" value={form.dataNascimento} onChange={handleChange}/>
            {errors.dataNascimento && <div className="text-danger">{errors.dataNascimento}</div>}
          </div>

          <div className="form-check mb-3">
            <input name="ativo" type="checkbox" className="form-check-input" checked={form.ativo} onChange={handleChange}/>
            <label className="form-check-label">Ativo</label>
          </div>

          <div className="mb-3">
            <label className="form-label">Observações:</label>
            <textarea name="observacoes" className="form-control" rows={3} value={form.observacoes} onChange={handleChange}/>
          </div>

          <button type="submit" className="btn btn-success">Salvar Alterações</button>
        </form>
      </div>
    </div>
  );
}
