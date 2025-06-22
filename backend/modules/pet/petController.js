// backend/modules/pet/petController.js

const Pet  = require('./petModel');
const Dono = require('../dono/donoModel');  // ajuste o path para onde está seu donoModel

// Criar Pet
exports.criarPet = async (req, res) => {
  try {
    const novoPet = new Pet(req.body);
    await novoPet.save();

    // Vincula o pet ao dono
    await Dono.findByIdAndUpdate(
      novoPet.dono,
      { $push: { pets: novoPet._id } },
      { new: true }
    );

    return res.status(201).json(novoPet);
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
};

// Listar todos os Pets
exports.listarPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    return res.json(pets);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

// Detalhar Pet por ID (com populate)
exports.detalharPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)
      .populate('tutor',   'nome telefone email')
      .populate('dono',    'nome telefone email pets')
      .populate('criador', 'nome email nivelAcesso');

    if (!pet) {
      return res.status(404).json({ erro: 'Pet não encontrado' });
    }
    return res.json(pet);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

// Editar Pet
exports.editarPet = async (req, res) => {
  try {
    const petAtualizado = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.json(petAtualizado);
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
};

// Excluir Pet
exports.excluirPet = async (req, res) => {
  try {
    // Antes de deletar, remova o vínculo no Dono
    const pet = await Pet.findById(req.params.id);
    if (pet) {
      await Dono.findByIdAndUpdate(
        pet.dono,
        { $pull: { pets: pet._id } }
      );
    }

    await Pet.findByIdAndDelete(req.params.id);
    return res.json({ mensagem: 'Pet deletado com sucesso' });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

// GET /api/pets/tutor/:id
exports.listarPetsPorTutor = async (req, res) => {
  try {
    const pets = await Pet.find({ tutor: req.params.id });
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar pets do tutor' });
  }
};
