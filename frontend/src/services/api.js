import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.158:3000';

const api = axios.create({
  baseURL: API_URL,
  timeout:15000
});

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token adicionado aos headers:', token); // Log para depuração
    }
    return config;
  },
  error => {
    console.error('Erro na configuração da requisição:', error.message); // Log para depuração
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('Erro na resposta da requisição:', error.message); // Log para depuração
    return Promise.reject(error);
  }
);

export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  console.log('getUser response:', response.data); // Log para depuração
  return response.data;
};

export const getUserPosts = async (userId) => {
  console.log('Fetching posts for user ID:', userId); // Log para depuração
  const response = await api.get(`/posts/${userId}`);
  return response.data;
};

export const updateUserPhoto = async (photoUrl) => {
  console.log('Updating profile photo with URL:', photoUrl); // Log para depuração
  const response = await api.put('/users/me/photo', { photo: photoUrl });
  console.log('updateUserPhoto response:', response.data); // Log para depuração
  return response.data;
};

export const createPost = async (content, userId) => {
  console.log('Creating post for user ID:', userId, 'with content:', content); // Log para depuração
  const response = await api.post('/posts/create', { content, userId });
  console.log('createPost response:', response.data); // Log para depuração
  return response.data;
};

export const likePost = async (postId, userId) => {
  console.log('Liking post for user ID:', userId, 'with post ID:', postId); // Log para depuração
  const response = await api.post('/posts/like', { postId, userId });
  console.log('likePost response:', response.data); // Log para depuração
  return response.data;
};


export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const register = async (name, username, email, password, confirmPassword) => {
  const response = await api.post('/users/register', { name, username, email, password, confirmPassword });
  return response.data;
};

export default api;