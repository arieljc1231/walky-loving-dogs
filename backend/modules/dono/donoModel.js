// models/Dono.js
const mongoose = require('mongoose');

const donoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cpf: { type: String, required: true, unique: true },
  senha: { type: String, required: true }, // novo campo obrigatório
  responsavel: { type: String },
  endereco: { type: String },
  dataNascimento: { type: Date },
  observacoes: { type: String },
  ativo: { type: Boolean, default: true },
  dataCadastro: { type: Date, default: Date.now },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }]
});

module.exports = mongoose.model('Dono', donoSchema);
