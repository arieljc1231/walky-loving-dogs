const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  nivelAcesso: {
    type: String,
    enum: ['super', 'admin', 'colaborador'],
    default: 'admin',
  },
  ativo: { type: Boolean, default: true },
  dataCadastro: { type: Date, default: Date.now },
  ultimoLogin: { type: Date },
});

module.exports = mongoose.model('Admin', adminSchema);
