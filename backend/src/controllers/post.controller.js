const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
    const { content, userId } = req.body;
    const post = new Post({ content, userId });
    await post.save();
    res.status(201).json(post);
}

exports.likePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await Post.findById(postId).populate('likes', 'name');
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }

    if (!Array.isArray(post.likes)) {
      post.likes = [];
    }

    const userIndex = post.likes.findIndex(like => like._id.toString() === userId);
    if (userIndex !== -1) {
      // Remove like
      post.likes.splice(userIndex, 1);
    } else {
      // Add like
      post.likes.push(userId);
    }

    await post.save();

    const populatedPost = await Post.findById(postId).populate('likes', 'name');

    res.status(200).send(populatedPost);
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.likePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await Post.findById(postId).populate('likes', 'name');
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }

    if (!Array.isArray(post.likes)) {
      post.likes = [];
    }

    const userIndex = post.likes.findIndex(like => like._id.toString() === userId);
    if (userIndex !== -1) {
      // Remove like
      post.likes.splice(userIndex, 1);
    } else {
      // Add like
      post.likes.push(userId);
    }

    await post.save();

    const populatedPost = await Post.findById(postId).populate('likes', 'name');

    res.status(200).send(populatedPost);
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.getUserPosts = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const posts = await Post.find({ userId }).populate('likes', 'name');
    res.status(200).send(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};