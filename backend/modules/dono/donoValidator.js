// backend/modules/dono/donoValidator.js
const { body } = require('express-validator');

exports.cadastro = [
  body('nome')
    .notEmpty().withMessage('Nome é obrigatório')
    .matches(/^[A-Za-zÀ-ÿ\s]+$/).withMessage('Nome deve conter apenas letras e espaços'),

  body('cpf')
    .notEmpty().withMessage('CPF é obrigatório')
    .matches(/^\d{11}$/).withMessage('CPF deve conter exatamente 11 dígitos numéricos'),

  body('email')
    .notEmpty().withMessage('Email é obrigatório')
    .isEmail().withMessage('Email inválido'),

  body('senha')
    .notEmpty().withMessage('Senha é obrigatória')
    .isLength({ min: 8 }).withMessage('Senha deve ter no mínimo 8 caracteres')
    .matches(/[A-Za-z]/).withMessage('Senha deve conter ao menos uma letra')
    .matches(/\d/).withMessage('Senha deve conter ao menos um número'),

  body('responsavel')
    .notEmpty().withMessage('Responsável é obrigatório'),

  body('endereco')
    .notEmpty().withMessage('Endereço é obrigatório'),
];

exports.edicao = [
  body('nome')
    .optional()
    .notEmpty().withMessage('Nome não pode ser vazio')
    .matches(/^[A-Za-zÀ-ÿ\s]+$/).withMessage('Nome deve conter apenas letras e espaços'),

  body('cpf')
    .optional()
    .matches(/^\d{11}$/).withMessage('CPF deve conter exatamente 11 dígitos numéricos'),

  body('email')
    .optional()
    .isEmail().withMessage('Email inválido'),

  body('senha')
    .optional()
    .isLength({ min: 8 }).withMessage('Senha deve ter no mínimo 8 caracteres')
    .matches(/[A-Za-z]/).withMessage('Senha deve conter ao menos uma letra')
    .matches(/\d/).withMessage('Senha deve conter ao menos um número'),

  body('responsavel')
    .optional()
    .notEmpty().withMessage('Responsável não pode ser vazio'),

  body('endereco')
    .optional()
    .notEmpty().withMessage('Endereço não pode ser vazio'),
];
