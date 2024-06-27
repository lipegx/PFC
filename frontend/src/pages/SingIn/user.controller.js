import { Alert } from 'react-native';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleLogin = async (username, password, navigation) => {
  if (!username || !password) {
    Alert.alert('Erro', 'Preencha todos os campos');
    return;
  }

  try {
    const response = await api.post('/auth/login', { username, password });
    const { token, user } = response.data;
    
    console.log('Login Success:', response.data);
    
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('userId', user.id.toString());
    await AsyncStorage.setItem('userName', username)
      .then(() => {
        console.log('Nome do usuário salvo!');
        navigation.navigate('ProfileScreen');
      })
      .catch(error => {
        console.log('Erro ao salvar nome do usuário:', error);
      });
  } catch (error) {
    console.error('Login failed:', error);
    Alert.alert('Seu login ou senha estão incorretos', 'Tente novamente');
  }
};