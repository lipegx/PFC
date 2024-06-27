const Post = require('../models/post');

exports.createPost = async (content, userId) => {
  const post = new Post({ content, userId });
  await post.save();
  return post;
};

exports.likePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post.likedBy.includes(userId)) {
    post.likes += 1;
    post.likedBy.push(userId);
    await post.save();
    return post;
  } else {
    throw new Error('Esse post ja foi curtido');
  }
};

exports.getUserPosts = async (userId) => {
  return await Post.find({ userId });
};