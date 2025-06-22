const express = require('express');
const router = express.Router();
const petController = require('./petController');
const petValidator = require('./petValidator');
const validarErros = require('../../validators/validarErros');

router.get('/tutor/:id', petController.listarPetsPorTutor);
router.post('/', petValidator.cadastro, validarErros, petController.criarPet);
router.get('/', petController.listarPets);
router.get('/:id', petController.detalharPet);
router.put('/:id', petValidator.edicao, validarErros, petController.editarPet);
router.delete('/:id', petController.excluirPet);

module.exports = router;
