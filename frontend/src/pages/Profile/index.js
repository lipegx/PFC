import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, FlatList, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileController from './profile.controller.js';
import styles from './styles';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      console.log('Stored user ID:', storedUserId);
      if (storedUserId) {
        await profileController.fetchUser(storedUserId, setUser);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      console.log('User data:', user);
      profileController.fetchUserPosts(user.id, setPosts);
    }
  }, [user]);

  const handlePhotoChange = async (newPhotoUrl) => {
    profileController.changeProfilePhoto(setUser, newPhotoUrl);
  };

  const handleLike = async (postId) => {
    if (user) {
      profileController.likePost(postId, posts, setPosts, user.id);
    }
  };

  const handleCreatePost = async () => {
    if (user && newPostContent.trim()) {
      profileController.createPost(newPostContent, user.id, setPosts);
      setNewPostContent('');
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
      <Button title="Alterar Foto" onPress={() => handlePhotoChange('https://example.com/new-photo.jpg')} />
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text>{item.content}</Text>
            <Button title="Curtir" onPress={() => handleLike(item.id)} />
            <Text>{item.likes} curtidas</Text>
          </View>
        )}
      />
    </View>
  );
}