const Evento = require('./eventoModel')
const Pet = require('../pet/petModel')

// Criar evento
exports.criarEvento = async (req, res) => {
  try {
    console.log('🔎 Dados recebidos para evento:', req.body)
    const novoEvento = new Evento(req.body)
    const eventoSalvo = await novoEvento.save()
    console.log('💾 Evento salvo:', eventoSalvo)
    res.status(201).json(eventoSalvo)
  } catch (err) {
    console.error('❌ Erro ao salvar evento:', err)
    res.status(400).json({ erro: 'Erro ao criar evento', detalhes: err.message })
  }
}

// Check-in genérico
exports.checkinEvento = async (req, res) => {
  const { pet, tutor, admin, dataEntrada, observacoes, tipo } = req.body
  try {
    if (tipo === 'Hospedagem') {
      const jaHospedado = await Evento.findOne({ pet, status: 'Ativo', tipo: 'Hospedagem' })
      if (jaHospedado) {
        return res.status(400).json({ erro: 'Este pet já está hospedado (evento ativo).' })
      }
    }
    const novoEvento = new Evento({ tipo, pet, tutor, admin, dataEntrada, observacoes })
    await novoEvento.save()
    res.status(201).json(novoEvento)
  } catch (err) {
    console.error('❌ Erro no check-in:', err)
    res.status(500).json({ erro: 'Erro ao registrar evento', detalhes: err.message })
  }
}

// Listar todos
exports.listarEventos = async (req, res) => {
  try {
    const eventos = await Evento.find().populate('pet tutor dono admin')
    res.status(200).json(eventos)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar eventos' })
  }
}

// Listar por pet
exports.eventosPorPet = async (req, res) => {
  try {
    const eventos = await Evento.find({ pet: req.params.id }).populate('tutor admin dono')
    res.status(200).json(eventos)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar eventos do pet' })
  }
}

// Listar por tutor
exports.eventosPorTutor = async (req, res) => {
  try {
    const eventos = await Evento.find({ tutor: req.params.id }).populate('pet tutor dono admin')
    res.status(200).json(eventos)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar eventos do tutor' })
  }
}

// Check-out
exports.checkoutEvento = async (req, res) => {
  try {
    const { id } = req.params
    const { dataSaida, observacoes } = req.body

    const evento = await Evento.findById(id)
    if (!evento) return res.status(404).json({ erro: 'Evento não encontrado.' })
    if (evento.status !== 'Ativo')
      return res.status(400).json({ erro: 'Este evento já foi finalizado ou cancelado.' })

    evento.dataSaida = dataSaida
    evento.status = 'Finalizado'
    if (observacoes) evento.observacoes = (evento.observacoes || '') + `\n${observacoes}`

    const eventoAtualizado = await evento.save()
    res.status(200).json(eventoAtualizado)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao finalizar evento', detalhes: err.message })
  }
}

// Deletar
exports.deletarEvento = async (req, res) => {
  try {
    await Evento.findByIdAndDelete(req.params.id)
    res.status(200).json({ mensagem: 'Evento deletado com sucesso' })
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao deletar evento' })
  }
}
