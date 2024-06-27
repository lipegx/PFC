import React, { useState } from 'react';
import { View, TextInput, Alert, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateUser } from './user.controller';
import styles from './styles';

export default function EditUserScreen() {
    const route = useRoute(); 
    const { userId, currentName, currentEmail, currentPassword, currentUsername } = route.params; 
    const navigation = useNavigation();
    

    const [name, setName] = useState(currentName);
    const [email, setEmail] = useState(currentEmail);
    const [password, setPassword] = useState(currentPassword);
    const [username, setUsername] = useState(currentUsername);

    const handleUpdate = () => {
        const updatedData = { name, username, email, password };
        updateUser(userId, updatedData, () => {
            Alert.alert("Sucesso", "Usuário atualizado com sucesso.");
            navigation.navigate('SignIn');
        }, () => {
            Alert.alert("Erro", "Não foi possível atualizar o usuário.");
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Atualizar Usuário</Text>
            </View>
            <Text style={styles.subTitle}>Nome</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nome"
            />
            <Text style={styles.subTitle}>Login</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Login"
            />
            <Text style={styles.subTitle}>E-mail</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
            />
            <Text style={styles.subTitle}>Confirme sua senha</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Senha"
                secureTextEntry={true}
            />
            <TouchableOpacity style = {styles.button} onPress={handleUpdate}>
                <Text style = {styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>
        </View>
    );
};