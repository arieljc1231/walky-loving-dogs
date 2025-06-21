import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

export default function EditarDono() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    cpf: '',
    responsavel: false,
    endereco: '',
    dataNascimento: '',
    ativo: true,
    observacoes: ''
  });
  const [erros, setErros] = useState({});

  useEffect(() => {
    api.get(`/donos/${id}`).then(response => {
      setForm(response.data);
    }).catch(err => {
      console.error('Erro ao buscar dono:', err);
    });
  }, [id]);

  const formatarCPF = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, '').slice(0, 11); // máximo 11 dígitos
    return apenasNumeros
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatarTelefone = (valor) => {
    return valor
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    let val = type === 'checkbox' ? checked : value;

    if (name === 'cpf') val = formatarCPF(val);
    if (name === 'telefone') val = formatarTelefone(val);

    setForm(f => ({ ...f, [name]: val }));
    setErros(err => ({ ...err, [name]: null }));
  };

  const validate = () => {
    const errors = {};
    const cpfNumerico = form.cpf.replace(/\D/g, '');
    const telNumerico = form.telefone.replace(/\D/g, '');

    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(form.nome)) {
      errors.nome = 'Nome deve conter apenas letras';
    }

    if (!telNumerico || telNumerico.length < 10 || telNumerico.length > 11) {
      errors.telefone = 'Telefone deve ter DDD + número (10 ou 11 dígitos)';
    }

    if (!cpfNumerico || cpfNumerico.length !== 11) {
      errors.cpf = 'CPF deve conter exatamente 11 números';
    }

    return errors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const valid = validate();
    setErros(valid);

    if (Object.keys(valid).length === 0) {
      try {
        await api.put(`/donos/${id}`, {
          ...form,
          cpf: form.cpf.replace(/\D/g, ''),
          telefone: form.telefone.replace(/\D/g, '')
        });
        navigate(`/donos/${id}`);
      } catch (err) {
        const resp = err.response?.data;
        if (resp?.erros) {
          const fieldErrors = resp.erros.reduce(
            (acc, cur) => ({ ...acc, [cur.path]: cur.msg }),
            {}
          );
          setErros(fieldErrors);
        } else {
          setErros({ form: resp?.erro || 'Erro ao atualizar dono' });
        }
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Editar Dono</h2>
          <div>
            <Link to="/home" className="btn btn-secondary me-2">← Voltar ao Início</Link>
            <Link to="/donos" className="btn btn-dark">Ver Dono</Link>
          </div>
        </div>

        {erros.form && <div className="alert alert-danger">{erros.form}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Nome</label>
            <input name="nome" className="form-control" value={form.nome} onChange={handleChange} />
            {erros.nome && <div className="text-danger">{erros.nome}</div>}
          </div>

          <div className="mb-3">
            <label>CPF</label>
            <input name="cpf" className="form-control" value={form.cpf} onChange={handleChange} />
            {erros.cpf && <div className="text-danger">{erros.cpf}</div>}
          </div>

          <div className="mb-3">
            <label>Telefone</label>
            <input name="telefone" className="form-control" value={form.telefone} onChange={handleChange} />
            {erros.telefone && <div className="text-danger">{erros.telefone}</div>}
          </div>

          <div className="mb-3">
            <label>Endereço</label>
            <input name="endereco" className="form-control" value={form.endereco} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label>Responsável</label>
            <input name="responsavel" className="form-control" value={form.responsavel} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label>Observações</label>
            <textarea name="observacoes" className="form-control" rows="3" value={form.observacoes} onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-success">Salvar Alterações</button>
        </form>
      </div>
    </div>
  );
}
