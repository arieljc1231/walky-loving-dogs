require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importação das rotas
const adminRoutes = require('./modules/admin/adminRoutes');
const donoRoutes = require('./modules/dono/donoRoutes');
const tutorRoutes = require('./modules/tutor/tutorRoutes');
const petRoutes = require('./modules/pet/petRoutes');
const eventoRoutes = require('./modules/evento/eventoRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares globais
app.use(cors());             // Habilita CORS para todas as origins
app.use(express.json());     // Parse automático de JSON no body

// Montagem dos endpoints da API
app.use('/api/admins', adminRoutes);
app.use('/api/donos', donoRoutes);
app.use('/api/tutores', tutorRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/eventos', eventoRoutes);

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Conectado ao MongoDB Atlas'))
  .catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

// Rota raiz apenas para teste de vida
app.get('/', (req, res) => {
  res.send('🎉 API Walky Loving Dogs funcionando!');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
