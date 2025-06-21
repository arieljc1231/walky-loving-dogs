import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'

export default function NovoEvento() {
  const { petId } = useParams()
  const navigate = useNavigate()

  const [pet, setPet] = useState(null)
  const [tipo, setTipo] = useState('Hospedagem')
  const [dataEntrada, setDataEntrada] = useState(new Date().toISOString().slice(0, 16))
  const [dataSaida, setDataSaida] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [erro, setErro] = useState('')

  // Detecta perfil
  const isTutor = !!localStorage.getItem('usuario_tutor')
  const isAdmin = !!localStorage.getItem('usuario_admin')

  // Função única de retorno
  const goBack = () => {
    if (isTutor)  return navigate('/tutor/home')
    if (isAdmin)  return navigate(`/pets/${petId}`)
    return navigate('/')
  }

  useEffect(() => {
    if (!petId) {
      setErro('ID do pet não foi fornecido.')
      return
    }
    api.get(`/pets/${petId}`)
      .then(({ data }) => setPet(data))
      .catch(() => setErro('Falha ao carregar dados do pet.'))
  }, [petId])

  const handleSubmit = async e => {
    e.preventDefault()
    setErro('')

    if (!dataEntrada) {
      setErro('Informe a data de entrada.')
      return
    }

    try {
      await api.post('/eventos', {
        tipo,
        pet: petId,
        tutor: pet.tutor._id,
        dono: pet.dono._id,
        dataEntrada,
        ...(dataSaida && { dataSaida }),
        ...(observacoes && { observacoes }),
      })

      goBack()
    } catch (err) {
      setErro(
        err.response?.data?.erro ||
        err.response?.data?.detalhes ||
        'Erro ao salvar evento.'
      )
    }
  }

  if (erro) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{erro}</Alert>
        <Button variant="secondary" onClick={goBack}>Voltar</Button>
      </Container>
    )
  }

  if (!pet) {
    return (
      <Container className="mt-4">
        <p>Carregando pet...</p>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      <h2>Cadastrar Evento para <strong>{pet.nome}</strong></h2>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Tipo de Evento</Form.Label>
          <Form.Select value={tipo} onChange={e => setTipo(e.target.value)}>
            {['Hospedagem','Passeio','Banho','Consulta','Alimentacao','Recreacao']
              .map(o => <option key={o} value={o}>{o}</option>)
            }
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Data de Entrada</Form.Label>
          <Form.Control
            type="datetime-local"
            value={dataEntrada}
            onChange={e => setDataEntrada(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Data de Saída <small className="text-muted">(opcional)</small></Form.Label>
          <Form.Control
            type="datetime-local"
            value={dataSaida}
            onChange={e => setDataSaida(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Observações <small className="text-muted">(opcional)</small></Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={observacoes}
            onChange={e => setObservacoes(e.target.value)}
            placeholder="Anotações adicionais..."
          />
        </Form.Group>
        <div className="d-flex">
          <Button variant="success" type="submit">Salvar</Button>
          <Button variant="secondary" className="ms-2" onClick={goBack}>Cancelar</Button>
        </div>
      </Form>
    </Container>
  )
}
