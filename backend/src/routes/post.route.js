const route = require('express').Router();
const postController = require('../controllers/post.controller');

route.post('/create', postController.createPost);
route.post('/like', postController.likePost);
route.get('/:userId', postController.getUserPosts);

module.exports = route;