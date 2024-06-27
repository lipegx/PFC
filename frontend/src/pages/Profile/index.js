import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, FlatList, TextInput } from 'react-native';
import { getUser, getUserPosts, updateUserPhoto, likePost, createPost } from '../../services/api';
import styles from './styles';

export default function ProfileScreen () {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        const userPosts = await getUserPosts(userData.id);
        setPosts(userPosts);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handlePhotoChange = async (newPhotoUrl) => {
    try {
      const updatedUser = await updateUserPhoto(newPhotoUrl);
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update photo', error);
    }
  };

  const handleLike = async (postId) => {
    if (user) {
      try {
        const updatedPost = await likePost(postId, user.id);
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
        );
      } catch (error) {
        console.error('Failed to like post', error);
      }
    }
  };

  const handleCreatePost = async () => {
    if (user && newPostContent.trim()) {
      try {
        const newPost = await createPost(newPostContent, user.id);
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        setNewPostContent('');
      } catch (error) {
        console.error('Failed to create post', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {user && (
        <>
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
        </>
      )}
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
};