const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const checkToken = require('../middlewares/user.middlewares');

router.post('/register', UserController.create);

router.post('/login', UserController.loginUser);

router.get('/:id', checkToken, async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id, '-password');
        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Erro interno do servidor' });
    }
});


router.get('/listUsers', checkToken, UserController.listUsers);

router.delete('/:id', checkToken, UserController.deleteUser);

router.put('/:id', checkToken, UserController.update);

module.exports = router;