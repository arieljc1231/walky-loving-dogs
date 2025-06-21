// src/modules/tutor/tutorValidator.js
const { body } = require('express-validator');

exports.cadastro = [
  body('nome')
    .notEmpty().withMessage('Nome é obrigatório'),
  body('telefone')
    .notEmpty().withMessage('Telefone é obrigatório'),
  body('email')
    .isEmail().withMessage('Email inválido'),
  body('senha')
    .isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
  body('cpf')
    .notEmpty().withMessage('CPF é obrigatório')
    .isLength({ min: 11, max: 14 }).withMessage('CPF deve ter entre 11 e 14 caracteres'),
  body('endereco')
    .optional().isString().withMessage('Endereço deve ser texto'),
  body('dataNascimento')
    .optional().isISO8601().withMessage('Data de nascimento inválida (formato ISO)'),
];

exports.edicao = [
  body('nome')
    .optional().notEmpty().withMessage('Nome não pode ser vazio'),
  body('telefone')
    .optional().notEmpty().withMessage('Telefone não pode ser vazio'),
  body('email')
    .optional().isEmail().withMessage('Email inválido'),
  body('cpf')
    .optional()
    .isLength({ min: 11, max: 14 }).withMessage('CPF deve ter entre 11 e 14 caracteres'),
  body('endereco')
    .optional().isString().withMessage('Endereço deve ser texto'),
  body('dataNascimento')
    .optional().isISO8601().withMessage('Data de nascimento inválida (formato ISO)'),
];

exports.login = [
  body('email')
    .isEmail().withMessage('Email inválido'),
  body('senha')
    .notEmpty().withMessage('Senha é obrigatória'),
];
