import { Alert } from 'react-native';
import api from '../../services/api';


export const listUsers = async (navigation) => {
    try {
        const response = await api.get('/listUsers');
        if (response.data) {
            console.log('Usuários recuperados com sucesso:', response.data);
            return response.data;
        }
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
};

export const handleDelete = async (userId, onSuccess, onError) => {
        
    Alert.alert(
        "Confirmação de Exclusão",
        "Você tem certeza que deseja excluir este usuário?",
        [
            {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "Sim, excluir",
                onPress: () => deleteUser(userId, onSuccess, onError),
                style: "destructive"
            }
        ],
        { cancelable: false }
    );
};

const deleteUser = async (userId, onSuccess, onError) => {
    try {
        const response = await api.delete(`/listUsers/${userId}`); // Ajuste a URL conforme necessário
        if (response.status === 200) {
            console.log("Usuário excluído com sucesso.");
            onSuccess();
        }
    } catch (error) {
        console.error("Erro ao excluir o usuário:", error);
        onError();
    }
};
