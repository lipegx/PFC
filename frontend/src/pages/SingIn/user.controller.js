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
      console.log('Login Success:', response.data)
      navigation.navigate('home');
      const userName = username; 
      AsyncStorage.setItem('userName', userName)
        .then(() => {
          console.log('Nome do usuário salvo!');
        })
        .catch(error => {
          console.log('Erro ao salvar nome do usuário:', error);
        });
    } catch (error) {
      console.error('login failed:', error);
      Alert.alert('Seu login ou senha estão incorretos', 'Tente novamente');
    }
  };