// src/pages/Pet/PetDetails.jsx
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'

// Formata ISO para dd/MM/yyyy
const formatDate = iso => {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR')
}

export default function PetDetails() {
  const { id: petId } = useParams()
  const navigate = useNavigate()
  const [pet, setPet] = useState(null)
  const [eventos, setEventos] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [petRes, eventosRes] = await Promise.all([
          api.get(`/pets/${petId}`),
          api.get(`/eventos/pet/${petId}`)
        ])
        setPet(petRes.data)
        setEventos(eventosRes.data)
      } catch {
        navigate('/pets')
      }
    }
    fetchData()
  }, [petId, navigate])

  const handleDelete = async () => {
    if (window.confirm('Deseja realmente excluir este pet?')) {
      await api.delete(`/pets/${petId}`)
      navigate('/pets')
    }
  }

  if (!pet) return <p>Carregando...</p>

  return (
    <div className="container mt-4">
      {/* Card de detalhes do pet */}
      <div className="card mb-4">
        <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Detalhes do Pet</h3>
          <div>
            <Link to="/home" className="btn btn-secondary me-2">← Voltar ao Início</Link>
            <Link to="/pets" className="btn btn-dark">Ver Pets</Link>
          </div>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item"><strong>Nome:</strong> {pet.nome}</li>
            <li className="list-group-item"><strong>Espécie:</strong> {pet.especie}</li>
            <li className="list-group-item"><strong>Raça:</strong> {pet.raca}</li>
            <li className="list-group-item">
              <strong>Idade:</strong> {pet.idade} {pet.idade > 1 ? 'anos' : 'ano'}
            </li>
            <li className="list-group-item"><strong>Peso:</strong> {pet.peso} kg</li>
            <li className="list-group-item"><strong>Porte:</strong> {pet.porte}</li>
            <li className="list-group-item"><strong>Sexo:</strong> {pet.sexo}</li>
            <li className="list-group-item"><strong>Cor:</strong> {pet.cor}</li>
            <li className="list-group-item">
              <strong>Castrado:</strong> {pet.castrado ? 'Sim' : 'Não'}
            </li>
            <li className="list-group-item">
              <strong>Carteira de Vacinação em Dia:</strong> {pet.carteiraVacinacao ? 'Sim' : 'Não'}
            </li>
            <li className="list-group-item">
              <strong>Data de Cadastro:</strong> {formatDate(pet.dataCadastro)}
            </li>
            <li className="list-group-item">
              <strong>Observações:</strong> {pet.observacoes || '—'}
            </li>
            <li className="list-group-item">
              <strong>Dono:</strong> {pet.dono?.nome || '—'}
            </li>
            <li className="list-group-item">
              <strong>Tutor:</strong> {pet.tutor?.nome || '—'}
            </li>
          </ul>
          <div className="d-flex justify-content-between">
            <div>
              <Link to={`/pets/${petId}/editar`} className="btn btn-warning me-2">Editar</Link>
              <button onClick={handleDelete} className="btn btn-danger">Excluir</button>
            </div>
            {/* Ações de evento removidas */}
          </div>
        </div>
      </div>

      {/* Card de eventos relacionados */}
      <div className="card">
        <div className="card-header bg-white border-0">
          <h5 className="mb-0">Eventos relacionados</h5>
        </div>
        <ul className="list-group list-group-flush">
          {eventos.length === 0 && (
            <li className="list-group-item">Nenhum evento registrado.</li>
          )}
          {eventos.map(evt => (
            <li key={evt._id} className="list-group-item">
              <strong>{evt.tipo}</strong> – Check-in: {formatDate(evt.dataEntrada)} – Check-out: {evt.dataSaida ? formatDate(evt.dataSaida) : 'em andamento'}
              <div className="mt-1">
                <small>
                  <strong>Observações:</strong> {evt.observacoes || '—'}
                </small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
