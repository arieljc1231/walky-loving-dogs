const express = require('express');
const router = express.Router();
const donoController = require('./donoController');
const donoValidator = require('./donoValidator');
const validarErros = require('../../validators/validarErros');

// Listar donos com pets vinculados
router.get('/com-pets', donoController.listarDonosComPets);

// CRUD de Dono
router.post('/', donoValidator.cadastro, validarErros, donoController.criarDono);
router.get('/', donoController.listarDonos);
router.get('/:id', donoController.detalharDono);
router.put('/:id', donoValidator.edicao, validarErros, donoController.editarDono);
router.delete('/:id', donoController.excluirDono);

// Login de Dono (único, centralizado no controller)
router.post('/login', donoController.loginDono);

module.exports = router;
