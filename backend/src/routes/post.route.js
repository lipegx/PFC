const route = require('express').Router();
const postController = require('../controllers/post.controller');
const checkToken = require('../middlewares/user.middlewares');

route.post('/create', postController.createPost);
route.post('/like', checkToken, postController.likePost);
route.get('/:userId', postController.getUserPosts);

module.exports = route;