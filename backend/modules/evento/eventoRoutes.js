const express = require('express')
const router = express.Router()
const eventoController = require('./eventoController')
const eventoValidator = require('./eventoValidator')
const validarErros = require('../../validators/validarErros')

// Cadastrar evento
router.post(
  '/',
  eventoValidator.validarEvento,
  validarErros,
  eventoController.criarEvento
)

// Check-out
router.put(
  '/:id/checkout',
  eventoValidator.validarCheckout,
  validarErros,
  eventoController.checkoutEvento
)

// Lista de eventos por tutor (antes da rota genérica!)
router.get('/tutor/:id', eventoController.eventosPorTutor)

// Listar todos
router.get('/', eventoController.listarEventos)

// Listar por pet
router.get('/pet/:id', eventoController.eventosPorPet)

module.exports = router
