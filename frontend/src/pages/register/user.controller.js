import { Alert } from 'react-native';
import api from '../../services/api';


export const handleRegister = async (name, username, email, password, confirmPassword, navigation) => {
    try {
      const response = await api.post('/auth/register', 
      { name, username, email, password, confirmPassword: password});
      console.log('User registered:', response.data)
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert('Erro', 'Falha ao cadastrar usuário');
    }
} 