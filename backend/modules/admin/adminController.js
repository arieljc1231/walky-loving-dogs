// modules/admin/adminController.js
const Admin = require('./adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Criar Admin (hash de senha)
exports.criarAdmin = async (req, res) => {
  try {
    const { senha, ...dados } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoAdmin = new Admin({ ...dados, senha: senhaHash });
    const adminSalvo = await novoAdmin.save();
    res.status(201).json(adminSalvo);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao cadastrar admin', detalhes: err.message });
  }
};

// Login de Admin (gera JWT)
exports.loginAdmin = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin não encontrado' });
    }
    const senhaValida = await bcrypt.compare(senha, admin.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    const token = jwt.sign(
      { id: admin._id, nivelAcesso: admin.nivelAcesso },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({
      _id: admin._id,
      nome: admin.nome,
      email: admin.email,
      nivelAcesso: admin.nivelAcesso,
      token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Listar todos
exports.listarAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar admins', detalhes: err.message });
  }
};

// Detalhar Admin
exports.detalharAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ erro: 'Admin não encontrado' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar admin', detalhes: err.message });
  }
};

// Editar Admin
exports.editarAdmin = async (req, res) => {
  try {
    if (req.body.senha) {
      req.body.senha = await bcrypt.hash(req.body.senha, 10);
    }
    const adminAtualizado = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!adminAtualizado) {
      return res.status(404).json({ erro: 'Admin não encontrado para atualização' });
    }
    res.json(adminAtualizado);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar admin', detalhes: err.message });
  }
};

// Excluir Admin
exports.excluirAdmin = async (req, res) => {
  try {
    const adminDeletado = await Admin.findByIdAndDelete(req.params.id);
    if (!adminDeletado) {
      return res.status(404).json({ erro: 'Admin não encontrado para exclusão' });
    }
    res.json({ mensagem: 'Admin deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar admin', detalhes: err.message });
  }
};
