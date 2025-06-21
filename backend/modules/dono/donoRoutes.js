const express = require('express');
const router = express.Router();
const donoController = require('./donoController');
const donoValidator = require('./donoValidator');
const validarErros = require('../../validators/validarErros');
const Dono = require('./donoModel');

router.post('/', donoValidator.cadastro, validarErros, donoController.criarDono);
router.get('/', donoController.listarDonos);
router.get('/:id', donoController.detalharDono);
router.put('/:id', donoValidator.edicao, validarErros, donoController.editarDono);
router.delete('/:id', donoController.excluirDono);

router.post('/login', donoController.loginDono);

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const dono = await Dono.findOne({ email });

        if (!dono || dono.senha !== senha) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
        }

        res.json({
            id: dono._id,
            nome: dono.nome,
            email: dono.email,
            perfil: 'dono'
        });
    } catch (err) {
        res.status(500).json({ erro: 'Erro no login' });
    }
});


module.exports = router;

