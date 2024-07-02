const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const checkToken = require('../middlewares/user.middlewares')



router.post('/register', UserController.create);
router.post('/login', UserController.loginUser);
router.get('/:id', checkToken, UserController.getUserById);
router.get('/listUsers', checkToken, UserController.listUsers);
router.delete('/:id', checkToken, UserController.deleteUser);
router.put('/:id', checkToken, UserController.update);
router.put('/me/photo', checkToken, UserController.updateUserPhoto);

module.exports = router;