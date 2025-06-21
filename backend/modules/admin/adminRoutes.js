const express = require('express');
const router = express.Router();
const adminController = require('./adminController');
const adminValidator = require('./adminValidator');
const validarErros = require('../../validators/validarErros');

// Cadastro de admin
router.post(
  '/',
  adminValidator.cadastro,
  validarErros,
  adminController.criarAdmin
);

// Login de admin
router.post(
  '/login',
  adminValidator.login,
  validarErros,
  adminController.loginAdmin
);

// Rotas CRUD de admin
router.get('/', adminController.listarAdmins);
router.get('/:id', adminController.detalharAdmin);
router.put(
  '/:id',
  adminValidator.edicao,
  validarErros,
  adminController.editarAdmin
);
router.delete('/:id', adminController.excluirAdmin);

module.exports = router;
