// modules/admin/adminValidator.js
const { body } = require('express-validator');

// Validação para cadastro de admin
exports.cadastro = [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('senha')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter no mínimo 6 caracteres'),
  body('nivelAcesso')
    .isIn(['admin', 'super', 'colaborador'])
    .withMessage('Nível de acesso inválido'),
];

// Validação para edição de admin
exports.edicao = [
  body('nome').optional().notEmpty().withMessage('Nome não pode ser vazio'),
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('senha')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Senha deve ter no mínimo 6 caracteres'),
  body('nivelAcesso')
    .optional()
    .isIn(['admin', 'super', 'colaborador'])
    .withMessage('Nível de acesso inválido'),
];

// **Validação para login de admin**
exports.login = [
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').notEmpty().withMessage('Senha é obrigatória'),
];
