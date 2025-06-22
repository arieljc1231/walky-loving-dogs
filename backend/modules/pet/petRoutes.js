// backend/modules/pet/petRoutes.js

const express       = require('express');
const router        = express.Router();
const petController = require('./petController');
const petValidator  = require('./petValidator');
const validarErros  = require('../../validators/validarErros');

// 1) Rotas legadas MUST go antes de `/ :id`
// Listar só pets do DONO
router.get('/dono/:id',  petController.listarPetsPorDono);

// Listar só pets do TUTOR
router.get('/tutor/:id', petController.listarPetsPorTutor);

// 2) Criar e validar
router.post(
  '/',
  petValidator.cadastro,
  validarErros,
  petController.criarPet
);

// 3) Listar “universal” com filtro via ?dono=xxx ou ?tutor=xxx
router.get('/', petController.listarPets);

// 4) Demais operações CRUD
router.get('/:id',       petController.detalharPet);
router.put(
  '/:id',
  petValidator.edicao,
  validarErros,
  petController.editarPet
);
router.delete('/:id',    petController.excluirPet);

module.exports = router;
