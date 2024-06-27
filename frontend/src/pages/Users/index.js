
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { listUsers } from './user.controller';
import styles from './styles';
import { handleDelete } from './user.controller';
import {useNavigation} from '@react-navigation/native';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const userList = await listUsers();
            setUsers(userList);
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
        }
    };

    const onDeleteSuccess = () => {
        fetchUsers();
    };

    const onDeleteError = () => {
        Alert.alert("Erro", "Não foi possível excluir o usuário.");
    };

    const deleteUser = (userId) => {
        handleDelete(userId, onDeleteSuccess, onDeleteError);
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.header}>
                <Text style={styles.title}>Lista de Usuários</Text>
            </View>
            <FlatList style={styles.list}
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userContainer}>
                        <View style={styles.userInfo}>
                            <Text>Nome: {item.name}</Text>
                            <Text>Login: {item.username}</Text>
                            <Text>E-mail: {item.email}</Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={
                                () => navigation.navigate('editUser', { userId: item.id, currentName: item.name, currentEmail: item.email, currentUsername: item.username })
                            } style={styles.buttonEdit}>
                                <Text>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteUser(item.id)} style={styles.buttonDelete}>
                                <Text style={styles.buttonDeleteText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}  
            />
        </View>
    );
}

