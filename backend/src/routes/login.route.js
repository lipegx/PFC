const route = require('express').Router();
const UserController = require('../controllers/user.controller');
const checkToken = require('../middlewares/user.middlewares');
const User = require('../models/User');

route.get('/:id', checkToken, async (req, res) => {
    const id = req.params.id;
    console.log('ID:', id); // Verifique o valor do ID

    try {
        const user = await User.findById(id, "-password");
        console.log('User:', user);

        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado' });
        }

        res.send(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).send({ message: 'Erro interno do servidor' });
    }
});

module.exports = route;
