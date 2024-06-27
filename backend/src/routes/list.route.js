const route = require('express').Router();
const UserController = require('../controllers/user.controller');


route.get('/', UserController.listUsers)

route.put('/:id', UserController.update);

route.delete('/:id', UserController.deleteUser);

module.exports = route;