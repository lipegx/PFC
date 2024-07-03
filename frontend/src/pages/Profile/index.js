import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileController from './profile.controller.js';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api'; // Certifique-se de usar a instância configurada do Axios

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        console.log('Stored user ID:', storedUserId);
        if (storedUserId) {
          await profileController.fetchUser(storedUserId, setUser);
        } else {
          console.error('No stored user ID found');
        }
      } catch (error) {
        console.error('Error fetching user ID from AsyncStorage:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user && user._id) {
      console.log('User data:', user);
      profileController.fetchUserPosts(user._id, setPosts).catch(error => {
        console.error('Error fetching user posts:', error);
      });
    } else {
      console.log('User is null or user._id is undefined');
    }
  }, [user]);

  const handlePhotoChange = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('ImagePicker result:', result);

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      console.log('Image URI:', localUri);

      if (!localUri) {
        console.error('Image URI is undefined');
        return;
      }

      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append('photo', { uri: localUri, name: filename, type });

      try {
        const response = await api.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const imageUrl = response.data.imageUrl;
        console.log('Image uploaded to:', imageUrl);

        // Atualize a foto do usuário no backend
        const updatedUser = await profileController.changeProfilePhoto(imageUrl);
        console.log('Updated user data:', updatedUser);

        setUser(updatedUser); // Atualize o estado do usuário com a nova URL da foto
        console.log('User photo updated:', updatedUser.photo);
      } catch (error) {
        console.error('Error uploading photo:', error);
        console.error('Response error:', error.response?.data || error.message);
      }
    }
  };

  const handleLike = async (postId) => {
    if (user && user._id) {
      try {
        console.log('Liking post with ID:', postId);
        await profileController.likePost(postId, posts, setPosts, user._id);
      } catch (error) {
        console.error('Error liking post:', error);
      }
    }
  };

  const handleCreatePost = async () => {
    if (user && user._id && newPostContent.trim()) {
      try {
        console.log('Creating post with content:', newPostContent);
        await profileController.createPost(newPostContent, user._id, setPosts);
        setNewPostContent('');
        console.log('Post created successfully');
      } catch (error) {
        console.error('Error creating post:', error);
      }
    } else {
      console.log('Post content is empty or user is not defined');
    }
  };

  const showLikes = (likes) => {
    if (likes.length > 0) {
      const likesString = likes.map(like => like.name).join('\n');
      Alert.alert('Users who liked this post', likesString);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.photo }} style={styles.profilePhoto} />
      <Button title="Alterar Foto" onPress={handlePhotoChange} />
      <Text style={styles.username}>{user.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Escreva algo..."
        value={newPostContent}
        onChangeText={setNewPostContent}
      />
      <Button title="Publicar" onPress={handleCreatePost} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id ? item._id.toString() : 'undefined'}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text>{item.content}</Text>
            <Button title="Curtir" onPress={() => handleLike(item._id)} />
            <TouchableOpacity onPress={() => showLikes(item.likes)}>
              <Text>{item.likes.length} curtidas</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum post ainda. Seja o primeiro a postar!</Text>}
      />
    </View>
  );
}