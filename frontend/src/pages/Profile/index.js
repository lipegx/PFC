import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileController from './profile.controller.js';
import styles from './styles';
import { launchImageLibrary } from 'react-native-image-picker';

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
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const photoUri = response.assets[0].uri;

        try {
          await profileController.changeProfilePhoto(setUser, photoUri);
        } catch (error) {
          console.error('Error changing profile photo:', error);
        }
      }
    });
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