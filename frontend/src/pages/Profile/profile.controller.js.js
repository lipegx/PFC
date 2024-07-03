import { api, getUser, getUserPosts, updateUserPhoto, likePost as apiLikePost, createPost as apiCreatePost } from '../../services/api';

const fetchUser = async (id, setUser) => {
  try {
    console.log('Fetching user with ID:', id);
    const user = await getUser(id);
    console.log('Fetched user data:', user);
    setUser(user);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

const fetchUserPosts = async (userId, setPosts) => {
  try {
    console.log('Fetching posts for user with ID:', userId);
    const posts = await getUserPosts(userId);
    console.log('Fetched posts:', posts);
    setPosts(posts.length ? posts : []);
  } catch (error) {
    console.error('Error fetching posts:', error);
    setPosts([]);
  }
};

const changeProfilePhoto = async (photoUrl) => {
  try {
    const response = await updateUserPhoto(photoUrl);
    console.log('User photo updated:', response.photo);
    return response;
  } catch (error) {
    console.error('Error updating profile photo:', error);
    throw error;
  }
};

const likePost = async (postId, posts, setPosts, userId) => {
  try {
    console.log('Liking post with ID:', postId);
    const updatedPost = await apiLikePost(postId, userId);
    const updatedPosts = posts.map(post => post._id === updatedPost._id ? updatedPost : post);
    setPosts(updatedPosts);
  } catch (error) {
    console.error('Error liking post:', error);
  }
};

const createPost = async (content, userId, setPosts) => {
  try {
    console.log('Creating new post with content:', content);
    const newPost = await apiCreatePost(content, userId);
    console.log('Created new post:', newPost);
    setPosts(prevPosts => [newPost, ...prevPosts]);
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

export default {
  fetchUser,
  fetchUserPosts,
  changeProfilePhoto,
  likePost,
  createPost,
};