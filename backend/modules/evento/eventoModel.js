const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['Hospedagem', 'Passeio', 'Banho', 'Consulta', 'Alimentacao', 'Recreacao'],
    default: 'Hospedagem',
    required: true,
  },
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor' },
  dono: { type: mongoose.Schema.Types.ObjectId, ref: 'Dono' },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  dataEntrada: { type: Date, default: Date.now },
  dataSaida: { type: Date },
  status: {
    type: String,
    enum: ['Ativo', 'Finalizado'],
    default: 'Ativo'
  },
  observacoes: { type: String },
});

module.exports = mongoose.model('Evento', eventoSchema);
