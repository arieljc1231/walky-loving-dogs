const express = require('express');
const router = express.Router();
const tutorController = require('./tutorController');
const tutorValidator = require('./tutorValidator');
const validarErros = require('../../validators/validarErros');

// Cadastro de Tutor
router.post('/', tutorValidator.cadastro, validarErros, tutorController.criarTutor);
// Login de Tutor
router.post('/login', tutorValidator.login, validarErros, tutorController.loginTutor);

// Rotas de CRUD padrão
router.get('/', tutorController.listarTutores);
router.get('/:id', tutorController.detalharTutor);
router.put('/:id', tutorValidator.edicao, validarErros, tutorController.editarTutor);
router.delete('/:id', tutorController.excluirTutor);

module.exports = router;
