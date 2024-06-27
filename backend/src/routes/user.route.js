const route = require('express').Router();
const UserController = require('../controllers/user.controller');
const User = require('../models/User');

route.post('/register', UserController.create, (req, res) => {
     console.log('Received data:', req.body);
 });
route.post('/login', UserController.loginUser, (req, res) => {
     console.log('Received data:', req.body);
 });
 route.get('/:id', async (req, res) => {
        const id = req.params.id;
        const user = await User.findById(id, "-password");

        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado' });
        }
        res.status(200).send(user);
    });

route.get('/listUsers', UserController.listUsers)

module.exports = route;