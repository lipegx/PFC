
import AsyncStorage from '@react-native-async-storage/async-storage';


    export const getUserName = async () => {
        try {
          const storedUserName = await AsyncStorage.getItem('userName');
          if (storedUserName) {
            return storedUserName;
          } else {
            console.log('Nome do usuário não encontrado.');
            return null;
          }
        } catch (error) {
          console.error('Erro ao recuperar o nome do usuário:', error);
          throw error;
        }
      };
