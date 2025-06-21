// modules/cliente/clienteController.js
const Cliente = require('./clienteModel');
const { sendWelcomeEmail } = require('../../services/mail');

// Criar Cliente (com e-mail de boas-vindas)
exports.criarCliente = async (req, res) => {
  try {
    const novoCliente = new Cliente(req.body);
    await novoCliente.save();

    // Dispara e-mail de boas-vindas em background
    sendWelcomeEmail(novoCliente.email, novoCliente.nome, 'cliente')
      .catch(err => console.error('Erro enviando e-mail Cliente:', err));

    return res.status(201).json(novoCliente);
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
};

// Listar todos os Clientes
exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Detalhar Cliente por ID
exports.detalharCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Editar Cliente
exports.editarCliente = async (req, res) => {
  try {
    const clienteAtualizado = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(clienteAtualizado);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// Excluir Cliente
exports.excluirCliente = async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Cliente deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Login de Cliente
exports.loginCliente = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const cliente = await Cliente.findOne({ email, senha });
    if (!cliente) {
      return res.status(401).json({ mensagem: 'Email ou senha inválidos.' });
    }
    res.json({
      _id:    cliente._id,
      nome:   cliente.nome,
      email:  cliente.email,
      perfil: 'cliente',
      token: cliente.token || null
    });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao realizar login.', erro: err });
  }
};
