const mongoose = require('mongoose');

// Lista de raças possíveis
const listaRacas = [
  'Labrador',
  'Bulldog',
  'Poodle',
  'Golden Retriever',
  'Beagle',
  'Shih Tzu',
  'Boxer',
];

const petSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  especie: {
    type: String,
    enum: ['Cachorro'],
    default: 'Cachorro',
    required: true,
  },
  raca: {
    type: String,
    enum: listaRacas,
    required: true,
  },
  idade: { type: Number, required: true },
  peso: { type: Number, required: true },
  porte: {
    type: String,
    enum: ['Pequeno', 'Médio', 'Grande'],
    required: true,
  },
  sexo: {
    type: String,
    enum: ['Macho', 'Fêmea'],
    required: true,
  },
  cor: { type: String, required: true },
  castrado: { type: Boolean, required: true },
  carteiraVacinacao: { type: Boolean, required: true },
  dataCadastro: { type: Date, default: Date.now },

  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
  dono: { type: mongoose.Schema.Types.ObjectId, ref: 'Dono', required: true },
  criador: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },

  observacoes: { type: String },
});

module.exports = mongoose.model('Pet', petSchema);
