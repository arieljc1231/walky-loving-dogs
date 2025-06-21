
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const racasOptions = ['Labrador', 'Bulldog', 'Poodle', 'Golden Retriever', 'Beagle', 'Shih Tzu', 'Boxer'];
const corOptions = ['Marrom', 'Preto', 'Branco', 'Caramelo', 'Cinza', 'Preto e Branco'];
const porteOptions = ['Pequeno', 'Médio', 'Grande'];
const sexoOptions = ['Macho', 'Fêmea'];

export default function NovoPet() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '', especie: 'Cachorro', raca: '', idade: '', peso: '', porte: 'Pequeno',
    sexo: 'Macho', cor: '', castrado: false, carteiraVacinacao: false,
    tutor: '', dono: '', criador: '', observacoes: ''
  });
  const [tutores, setTutores] = useState([]);
  const [donos, setDonos] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.get('/tutores').then(r => setTutores(r.data));
    api.get('/donos').then(r => setDonos(r.data));
    api.get('/admins').then(r => setAdmins(r.data));
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setErrors(errs => ({ ...errs, [name]: null }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/pets', {
        ...form,
        idade: Number(form.idade),
        peso: Number(form.peso)
      });
      navigate('/pets');
    } catch (err) {
      const resp = err.response?.data;
      if (resp?.erros) {
        const fieldErrors = resp.erros.reduce(
          (acc, cur) => ({ ...acc, [cur.path]: cur.msg }), {}
        );
        setErrors(fieldErrors);
      } else {
        setErrors({ form: resp?.erro || 'Erro ao cadastrar pet' });
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Cadastrar Novo Pet</h2>
          <div>
            <Link to="/home" className="btn btn-secondary me-2">← Voltar ao Início</Link>
            <Link to="/pets" className="btn btn-dark">Ver Pets</Link>
          </div>
        </div>

        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              name="nome"
              className="form-control"
              value={form.nome}
              onChange={(e) => {
                const somenteLetras = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
                setForm(f => ({ ...f, nome: somenteLetras }));
                setErrors(errs => ({ ...errs, nome: null }));
              }}
            />
            {errors.nome && <div className="text-danger">{errors.nome}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Espécie</label>
           <input name="especie" className="form-control" value={form.especie} readOnly />

            {errors.especie && <div className="text-danger">{errors.especie}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Raça</label>
            <select name="raca" className="form-select" value={form.raca} onChange={handleChange}>
              <option value="">Selecione...</option>
              {racasOptions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            {errors.raca && <div className="text-danger">{errors.raca}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Idade</label>
            <input name="idade" type="number" className="form-control" value={form.idade} onChange={handleChange} />
            {errors.idade && <div className="text-danger">{errors.idade}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Peso (kg)</label>
            <input name="peso" type="number" className="form-control" value={form.peso} onChange={handleChange} />
            {errors.peso && <div className="text-danger">{errors.peso}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Porte</label>
            <select name="porte" className="form-select" value={form.porte} onChange={handleChange}>
              {porteOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Sexo</label>
            <select name="sexo" className="form-select" value={form.sexo} onChange={handleChange}>
              {sexoOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Cor</label>
            <select name="cor" className="form-select" value={form.cor} onChange={handleChange}>
              <option value="">Selecione...</option>
              {corOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.cor && <div className="text-danger">{errors.cor}</div>}
          </div>

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" name="castrado" checked={form.castrado} onChange={handleChange} />
            <label className="form-check-label">Castrado</label>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="carteiraVacinacao"
              checked={form.carteiraVacinacao}
              onChange={handleChange}
            />
            <label className="form-check-label">Carteira de Vacinação em Dia</label>
            {errors.carteiraVacinacao && (
              <div className="text-danger">{errors.carteiraVacinacao}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Tutor</label>
            <select name="tutor" className="form-select" value={form.tutor} onChange={handleChange}>
              <option value="">Selecione...</option>
              {tutores.map(t => <option key={t._id} value={t._id}>{t.nome}</option>)}
            </select>
            {errors.tutor && <div className="text-danger">{errors.tutor}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Dono</label>
            <select name="dono" className="form-select" value={form.dono} onChange={handleChange}>
              <option value="">Selecione...</option>
              {donos.map(d => <option key={d._id} value={d._id}>{d.nome}</option>)}
            </select>
            {errors.dono && <div className="text-danger">{errors.dono}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Criador (Admin)</label>
            <select name="criador" className="form-select" value={form.criador} onChange={handleChange}>
              <option value="">Selecione...</option>
              {admins.map(a => <option key={a._id} value={a._id}>{a.nome}</option>)}
            </select>
            {errors.criador && <div className="text-danger">{errors.criador}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Observações</label>
            <textarea name="observacoes" className="form-control" rows="3" value={form.observacoes} onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-success">Cadastrar Pet</button>
        </form>
      </div>
    </div>
  );
}
