
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../services/api';

const racasOptions = ['Labrador', 'Bulldog', 'Poodle', 'Golden Retriever', 'Beagle', 'Shih Tzu', 'Boxer'];
const corOptions = ['Marrom', 'Preto', 'Branco', 'Caramelo', 'Cinza', 'Preto e Branco'];
const porteOptions = ['Pequeno', 'Médio', 'Grande'];
const sexoOptions = ['Macho', 'Fêmea'];

export default function EditarPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '', especie: 'Cachorro', raca: '', idade: '', peso: '', porte: 'Pequeno',
    sexo: 'Macho', cor: '', castrado: false, carteiraVacinacao: false,
    tutor: '', dono: '', observacoes: ''
  });
  const [tutores, setTutores] = useState([]);
  const [donos, setDonos] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.get(`/pets/${id}`).then(response => setForm(response.data));
    api.get('/tutores').then(r => setTutores(r.data));
    api.get('/donos').then(r => setDonos(r.data));
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.put(`/pets/${id}`, {
        ...form,
        idade: Number(form.idade),
        peso: Number(form.peso)
      });
      navigate('/pets');
    } catch (err) {
      const resp = err.response?.data;
      console.log('Erro no PUT:', resp);
      if (resp?.erros) {
        const fieldErrors = resp.erros.reduce(
          (acc, cur) => ({ ...acc, [cur.path]: cur.msg }), {}
        );
        setErrors(fieldErrors);
      } else {
        setErrors({ form: resp?.erro || 'Erro ao atualizar pet' });
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Editar Pet</h2>
          <div>
            <Link to="/home" className="btn btn-secondary me-2">← Voltar ao Início</Link>
            <Link to="/pets" className="btn btn-dark">Ver Pets</Link>
          </div>
        </div>

        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input name="nome" className="form-control" value={form.nome} onChange={handleChange} />
            {errors.nome && <div className="text-danger">{errors.nome}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Espécie</label>
            <input name="especie" className="form-control" value="Cachorro" readOnly />
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
            {errors.porte && <div className="text-danger">{errors.porte}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Sexo</label>
            <select name="sexo" className="form-select" value={form.sexo} onChange={handleChange}>
              {sexoOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.sexo && <div className="text-danger">{errors.sexo}</div>}
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
            <input className="form-check-input" type="checkbox" name="carteiraVacinacao" checked={form.carteiraVacinacao} onChange={handleChange} />
            <label className="form-check-label">Carteira de Vacinação em Dia</label>
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
            <label className="form-label">Observações</label>
            <textarea name="observacoes" className="form-control" rows="3" value={form.observacoes} onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-success">Salvar</button>
        </form>
      </div>
    </div>
  );
}
