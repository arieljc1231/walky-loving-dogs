// modules/dono/donoController.js
const Dono = require('./donoModel');
const { sendWelcomeEmail } = require('../../services/mail');

// Criar Dono (com e-mail de boas-vindas)
exports.criarDono = async (req, res) => {
  try {
    const novoDono = new Dono(req.body);
    await novoDono.save();

    // Dispara e-mail de boas-vindas em background
    sendWelcomeEmail(novoDono.email, novoDono.nome, 'dono')
      .catch(err => console.error('Erro enviando e-mail Dono:', err));

    return res.status(201).json(novoDono);
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
};

// Listar todos os Donos
exports.listarDonos = async (req, res) => {
  try {
    const donos = await Dono.find();
    res.json(donos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Detalhar Dono por ID
exports.detalharDono = async (req, res) => {
  try {
    const dono = await Dono.findById(req.params.id);
    if (!dono) return res.status(404).json({ erro: 'Dono não encontrado' });
    res.json(dono);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Editar Dono
exports.editarDono = async (req, res) => {
  try {
    const donoAtualizado = await Dono.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(donoAtualizado);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// Excluir Dono
exports.excluirDono = async (req, res) => {
  try {
    await Dono.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Dono deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Login de Dono
exports.loginDono = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const dono = await Dono.findOne({ email, senha });
    if (!dono) {
      return res.status(401).json({ mensagem: 'Email ou senha inválidos.' });
    }
    res.json({
      _id:    dono._id,
      nome:   dono.nome,
      email:  dono.email,
      perfil: 'dono',
      // se usar JWT, gere aqui e envie token
      token: dono.token || null
    });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao realizar login.', erro: err });
  }
};
