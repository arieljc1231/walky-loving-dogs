
const { body } = require('express-validator');

const listaRacas = [
  'Labrador', 'Bulldog', 'Poodle', 'Golden Retriever', 'Beagle', 'Shih Tzu', 'Boxer',
];

const listaCores = [
  'Marrom', 'Preto', 'Branco', 'Caramelo', 'Cinza', 'Preto e Branco',
];

exports.cadastro = [
  body('nome')
    .notEmpty().withMessage('Nome é obrigatório')
    .matches(/^[A-Za-zÀ-ÿ\s]+$/).withMessage('Nome deve conter apenas letras'),
  body('especie').notEmpty().isIn(['Cachorro']).withMessage('Espécie inválida'),
  body('raca').notEmpty().isIn(listaRacas).withMessage('Raça inválida'),
  body('idade').isInt({ min: 0 }).withMessage('Idade deve ser número inteiro'),
  body('peso').isFloat({ min: 0 }).withMessage('Peso deve ser número positivo'),
  body('porte').notEmpty().isIn(['Pequeno', 'Médio', 'Grande']).withMessage('Porte inválido'),
  body('sexo').notEmpty().isIn(['Macho', 'Fêmea']).withMessage('Sexo inválido'),
  body('cor').notEmpty().isIn(listaCores).withMessage('Cor inválida'),
  body('castrado').isBoolean().withMessage('Castrado deve ser true ou false'),
  body('carteiraVacinacao').custom(value => {
    if (value !== true) throw new Error('Carteira de vacinação em dia é obrigatória');
    return true;
  }),
  body('tutor').notEmpty().isMongoId().withMessage('ID de tutor inválido'),
  body('dono').notEmpty().isMongoId().withMessage('ID de dono inválido'),
];

exports.edicao = [
  body('nome')
    .optional()
    .matches(/^[A-Za-zÀ-ÿ\s]+$/).withMessage('Nome deve conter apenas letras'),
  body('especie').optional().isIn(['Cachorro']),
  body('raca').optional().isIn(listaRacas),
  body('idade').optional().isInt({ min: 0 }),
  body('peso').optional().isFloat({ min: 0 }),
  body('porte').optional().isIn(['Pequeno', 'Médio', 'Grande']),
  body('sexo').optional().isIn(['Macho', 'Fêmea']),
  body('cor').optional().isIn(listaCores),
  body('castrado').optional().isBoolean(),
  body('carteiraVacinacao').optional().isBoolean(),
  body('tutor').optional().isMongoId(),
  body('dono').optional().isMongoId(),
  body('observacoes').optional().isString()
];
