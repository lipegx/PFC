import { getUser, getUserPosts, updateUserPhoto, likePost as apiLikePost, createPost as apiCreatePost } from '../../services/api';

const fetchUser = async (id, setUser) => {
  console.log('Fetching user with ID:', id);
  const user = await getUser(id);
  setUser(user);
};

const fetchUserPosts = async (userId, setPosts) => {
  console.log('Fetching posts for user with ID:', userId);
  const posts = await getUserPosts(userId);
  setPosts(posts);
};

const changeProfilePhoto = async (setUser, photoUrl) => {
  console.log('Updating profile photo'); 
  const updatedUser = await updateUserPhoto(photoUrl);
  setUser(updatedUser);
};

const likePost = async (postId, posts, setPosts, userId) => {
  console.log('Liking post with ID:', postId); 
  try {
    const updatedPost = await apiLikePost(postId, userId);
    const updatedPosts = posts.map(post => post.id === updatedPost.id ? updatedPost : post);
    setPosts(updatedPosts);
  } catch (error) {
    console.error(error);
  }
};

const createPost = async (content, userId, setPosts) => {
  console.log('Creating new post'); 
  const newPost = await apiCreatePost(content, userId);
  setPosts(prevPosts => [newPost, ...prevPosts]);
};

export default {
  fetchUser,
  fetchUserPosts,
  changeProfilePhoto,
  likePost,
  createPost,
};