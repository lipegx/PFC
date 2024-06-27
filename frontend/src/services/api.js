import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.10:3000';
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const getUserPosts = async (userId) => {
  const response = await api.get(`/posts/${userId}`);
  return response.data;
};

export const updateUserPhoto = async (photoUrl) => {
  const response = await api.put('/users/me/photo', { photo: photoUrl });
  return response.data;
};

export const likePost = async (postId, userId) => {
  const response = await api.post('/posts/like', { postId, userId });
  return response.data;
};

export const createPost = async (content, userId) => {
  const response = await api.post('/posts/create', { content, userId });
  return response.data;
};

export const login = async (username, password) => {
  const response = await api.post('/users/login', { username, password });
  return response.data;
};

export default api;