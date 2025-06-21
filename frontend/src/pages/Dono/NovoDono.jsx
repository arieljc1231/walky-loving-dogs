import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const NovoDono = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    cpf: '',
    senha: '',            // ADICIONADO
    responsavel: false,
    endereco: '',
    dataNascimento: '',
    ativo: true,
    observacoes: ''
  });
  const [errors, setErrors] = useState({});

  const formatarCPF = (valor) => {
    return valor
      .replace(/\D/g, '')
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatarTelefone = (valor) => {
    return valor
      .replace(/\D/g, '')
      .slice(0, 11)
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    let val = type === 'checkbox' ? checked : value;

    if (name === 'cpf') val = formatarCPF(val);
    if (name === 'telefone') val = formatarTelefone(val);
    if (name === 'nome') val = val.replace(/[^A-Za-zÀ-ÿ\s]/g, '');

    setForm(f => ({ ...f, [name]: val }));
    setErrors(err => ({ ...err, [name]: null }));
  };

  const validate = () => {
    const errors = {};
    const cpfNumerico = form.cpf.replace(/\D/g, '');
    const telNumerico = form.telefone.replace(/\D/g, '');

    if (!form.nome.trim()) errors.nome = 'Nome é obrigatório';
    if (!telNumerico || telNumerico.length < 10 || telNumerico.length > 11) {
      errors.telefone = 'Telefone deve conter DDD + número';
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      errors.email = 'Email inválido';
    }
    if (!cpfNumerico || cpfNumerico.length !== 11) {
      errors.cpf = 'CPF deve ter 11 dígitos';
    }
    if (!form.senha || form.senha.length < 6) {
      errors.senha = 'A senha deve ter no mínimo 6 caracteres';
    }
    if (!form.endereco.trim()) errors.endereco = 'Endereço é obrigatório';
    if (!form.dataNascimento) {
      errors.dataNascimento = 'Data de nascimento inválida';
    }

    return errors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const valids = validate();
    setErrors(valids);

    if (Object.keys(valids).length === 0) {
      try {
        await api.post('/donos', {
          ...form,
          cpf: form.cpf.replace(/\D/g, ''),
          telefone: form.telefone.replace(/\D/g, '')
        });
        navigate('/donos');
      } catch (err) {
        const resp = err.response?.data;
        if (resp?.erros) {
          const fieldErrors = resp.erros.reduce(
            (acc, cur) => ({ ...acc, [cur.path]: cur.msg }),
            {}
          );
          setErrors(fieldErrors);
        } else {
          setErrors({ form: resp?.erro || 'Erro ao cadastrar dono' });
        }
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Cadastrar Novo Dono</h2>
          <div>
            <Link to="/home" className="btn btn-secondary me-2">← Voltar ao Início</Link>
            <Link to="/donos" className="btn btn-dark">Ver Donos</Link>
          </div>
        </div>

        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome:</label>
            <input name="nome" className="form-control" value={form.nome} onChange={handleChange} />
            {errors.nome && <div className="text-danger">{errors.nome}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">CPF:</label>
            <input name="cpf" className="form-control" value={form.cpf} onChange={handleChange} />
            {errors.cpf && <div className="text-danger">{errors.cpf}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Endereço:</label>
            <input name="endereco" className="form-control" value={form.endereco} onChange={handleChange} />
            {errors.endereco && <div className="text-danger">{errors.endereco}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Telefone:</label>
            <input name="telefone" className="form-control" value={form.telefone} onChange={handleChange} />
            {errors.telefone && <div className="text-danger">{errors.telefone}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Senha:</label>
            <input name="senha" type="password" className="form-control" value={form.senha} onChange={handleChange} />
            {errors.senha && <div className="text-danger">{errors.senha}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Data de Nascimento:</label>
            <input name="dataNascimento" type="date" className="form-control" value={form.dataNascimento} onChange={handleChange} />
            {errors.dataNascimento && <div className="text-danger">{errors.dataNascimento}</div>}
          </div>

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" name="responsavel" checked={form.responsavel} onChange={handleChange} />
            <label className="form-check-label">Responsável</label>
          </div>

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" name="ativo" checked={form.ativo} onChange={handleChange} />
            <label className="form-check-label">Ativo</label>
          </div>

          <div className="mb-3">
            <label className="form-label">Observações:</label>
            <textarea name="observacoes" className="form-control" rows={3} value={form.observacoes} onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-success">Cadastrar Dono</button>
        </form>
      </div>
    </div>
  );
};

export default NovoDono;
