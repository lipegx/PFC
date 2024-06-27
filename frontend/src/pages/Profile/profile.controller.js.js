import api from '../../services/api2';

const fetchUser = async (setUser) => {
  const user = await api.getUser();
  setUser(user);
};

const fetchUserPosts = async (userId, setPosts) => {
  const posts = await api.getUserPosts(userId);
  setPosts(posts);
};

const changeProfilePhoto = async (setUser, photoUrl) => {
  const updatedUser = await api.updateUserPhoto(photoUrl);
  setUser(updatedUser);
};

const likePost = async (postId, posts, setPosts, userId) => {
  try {
    const updatedPost = await api.likePost(postId, userId);
    const updatedPosts = posts.map(post => post.id === updatedPost.id ? updatedPost : post);
    setPosts(updatedPosts);
  } catch (error) {
    console.error(error);
  }
};

const createPost = async (content, userId, setPosts) => {
  const newPost = await api.createPost(content, userId);
  setPosts(prevPosts => [newPost, ...prevPosts]);
};

export default {
  fetchUser,
  fetchUserPosts,
  changeProfilePhoto,
  likePost,
  createPost,
};