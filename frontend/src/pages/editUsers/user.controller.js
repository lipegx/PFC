import api from '../../services/api';

export const updateUser = async (userId, updatedData, onSuccess, onError) => {
    try {
        const response = await api.put(`/listUsers/${userId}`, updatedData);
        if (response.status === 200) {
            console.log("Usuário atualizado com sucesso.");
            onSuccess();
        } else {
            console.error("Falha ao atualizar usuário:", response.status);
            onError();
        }
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        onError();
    }
};