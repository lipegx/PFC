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
import { handleLogin } from "./user.controller";



export default function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const userLogin = async () => {
        await handleLogin(username, password, navigation);
    };

    return (
        <View 
        style={styles.container}>

            <animatable.Image style = {styles.containerLogo}
                    source={require('../../../assets/logo.png')}
                    resizeMode="contain"
                    animation={'fadeInDown'}></animatable.Image>

            <animatable.View delay={500} animation='fadeInLeft' style = {styles.containerHeader}>
                <Text style = {styles.message}>
                    Bem vindo(a)
                </Text>
            </animatable.View>
            <animatable.View delay={1000} animation='fadeInUp' style = {styles.containerForm}>
                <Text style={styles.login}>Entre com sua conta</Text>

                <Text style={styles.title}>Nome de Usuário</Text>
                <TextInput
                placeholder="Nome de Usuário"
                value={username}
                onChangeText={setUsername}
                style = {styles.input}>
                </TextInput>

                <Text style={styles.title}>Senha</Text>
                <TextInput
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                style = {styles.input}
                secureTextEntry = {true}>
                </TextInput>
                

                <TouchableOpacity style={styles.button}
                onPress={userLogin}>
                    <Text style= {styles.buttonText}>
                        Entrar
                        </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister}
                onPress ={() => navigation.navigate('register')}>
                    <Text style= {styles.registerText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>

            </animatable.View>
        </View>
    );
    }

