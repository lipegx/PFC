const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: String,
  likes: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;