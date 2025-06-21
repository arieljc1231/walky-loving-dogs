// modules/tutor/tutorController.js
const Tutor = require('./tutorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require('../../services/mail');

// Criar Tutor com hash de senha + e-mail de boas-vindas
exports.criarTutor = async (req, res) => {
  try {
    const { senha, ...rest } = req.body;
    const hash = await bcrypt.hash(senha, 10);
    const novoTutor = new Tutor({ ...rest, senha: hash });
    await novoTutor.save();

    // Dispara e-mail de boas-vindas em background
    sendWelcomeEmail(novoTutor.email, novoTutor.nome, 'tutor')
      .catch(err => console.error('Erro enviando e-mail Tutor:', err));

    return res.status(201).json(novoTutor);
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
};

// Login Tutor: compara senha e retorna JWT
exports.loginTutor = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const tutor = await Tutor.findOne({ email });
    if (!tutor) {
      return res.status(404).json({ erro: 'Tutor não encontrado' });
    }

    const match = await bcrypt.compare(senha, tutor.senha);
    if (!match) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: tutor._id, role: 'tutor' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({ _id: tutor._id, nome: tutor.nome, email: tutor.email, token });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

// Listar todos os Tutores
exports.listarTutores = async (req, res) => {
  try {
    const tutores = await Tutor.find();
    return res.json(tutores);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

// Detalhar Tutor por ID
exports.detalharTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      return res.status(404).json({ erro: 'Tutor não encontrado' });
    }
    return res.json(tutor);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

// Editar Tutor (inclui hash de nova senha, se fornecida)
exports.editarTutor = async (req, res) => {
  try {
    const update = { ...req.body };
    if (update.senha) {
      update.senha = await bcrypt.hash(update.senha, 10);
    }
    const tutorAtualizado = await Tutor.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    return res.json(tutorAtualizado);
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
};

// Excluir Tutor
exports.excluirTutor = async (req, res) => {
  try {
    await Tutor.findByIdAndDelete(req.params.id);
    return res.json({ mensagem: 'Tutor deletado com sucesso' });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};