// modules/evento/eventoValidator.js
const { body } = require('express-validator');

exports.validarEvento = [
  body('tipo')
    .notEmpty().withMessage('Tipo de evento é obrigatório'),
  body('pet')
    .notEmpty().withMessage('ID do pet é obrigatório')
    .isMongoId().withMessage('ID de pet inválido'),
  body('dono')
    .notEmpty().withMessage('ID do dono é obrigatório')
    .isMongoId().withMessage('ID de dono inválido'),
  body('tutor')
    .notEmpty().withMessage('ID do tutor é obrigatório')
    .isMongoId().withMessage('ID de tutor inválido'),
  body('dataEntrada')
    .notEmpty().withMessage('Data de entrada é obrigatória')
    .isISO8601().withMessage('Data de entrada deve estar no formato ISO8601'),
  body('dataSaida')
    .optional()
    .isISO8601().withMessage('Data de saída deve estar no formato ISO8601'),
  body('observacoes')
    .optional()
    .isString().withMessage('Observações inválidas'),
];

exports.validarCheckout = [
  body('dataSaida')
    .notEmpty().withMessage('Data de saída é obrigatória para checkout')
    .isISO8601().withMessage('Data de saída deve estar no formato ISO8601'),
  body('observacoes')
    .optional()
    .isString().withMessage('Observações inválidas'),
];
