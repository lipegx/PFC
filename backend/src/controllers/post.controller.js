const Post = require('../models/post');

exports.createPost = async (req, res) => {
    const { content, userId } = req.body;
    const post = new Post({ content, userId });
    await post.save();
    res.status(201).json(post);
};

exports.likePost = async (req, res) => {
  const { postId, userId } = req.body;
  const post = await Post.findById(postId);

  if (!post.likedBy.includes(userId)) {
    post.likes += 1;
    post.likedBy.push(userId);
    await post.save();
    res.status(200).json(post);
  } else {
    res.status(400).json({ message: 'Esse post já foi curtido' });
  }
};

exports.getUserPosts = async (req, res) => {
  const { userId } = req.params;
  const posts = await Post.find({ userId });
  res.status(200).json(posts);
};