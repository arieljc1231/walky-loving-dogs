const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  cpf: { type: String, required: true },
  endereco: { type: String },
  dataNascimento: { type: Date },
  observacoes: { type: String }, // ✅ adicionado aqui
  ativo: { type: Boolean, default: true },
  dataCadastro: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Tutor', tutorSchema);
