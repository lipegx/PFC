import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";
import * as animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import { handleRegister } from "./user.controller";


export default function Register() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userRegister = () => {
        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem");
            return; 
        }
        handleRegister(name, username, email, password, confirmPassword, navigation);
    };

    return (
        <View style={styles.container}>
            <animatable.Image style={styles.containerLogo}
                source={require('../../../assets/logo.png')}
                resizeMode="contain"
                animation={'fadeInDown'} />

           
            <animatable.View delay={1000} animation='fadeInUp' style={styles.containerForm}>
            <View delay={500} animation='fadeInUp' style={styles.containerHeader}>
                <Text style={styles.message}>
                    Cadastre-se
                </Text>
            </View>
                <Text style={styles.login}>Crie sua conta</Text>

                <Text style={styles.title}>Nome</Text>
                <TextInput
                    value={name}
                    placeholder="Digite seu nome"
                    onChangeText={setName}
                    style={styles.input}>
                </TextInput>

                <Text style={styles.title}>Username</Text>
                <TextInput
                    value={username}
                    placeholder="Digite seu nome de usuário"
                    onChangeText={setUsername}
                    style={styles.input}>
                </TextInput>


                <Text style={styles.title}>Email</Text>
                <TextInput
                    value={email}
                    placeholder="Digite seu nome"
                    onChangeText={setEmail}
                    style={styles.input}>
                </TextInput>

                <Text style={styles.title}>Senha</Text>
                <TextInput
                    value={password}
                    placeholder="Digite sua senha"
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry={true}>
                </TextInput>

                <Text style={styles.title}>Confirme sua senha</Text>
                <TextInput
                    value={confirmPassword}
                    placeholder="Confirme sua senha"
                    onChangeText={setConfirmPassword}
                    style={styles.input}
                    secureTextEntry={true}>
                </TextInput>

                <TouchableOpacity style={styles.button}
                onPress={userRegister}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister}
                onPress = {() => navigation.navigate('SignIn')}>
                    <Text style={styles.registerText}>Já possui uma conta? Entre</Text>
                </TouchableOpacity>
            </animatable.View>
        </View>
    );
}

