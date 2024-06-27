// Home.js
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity
} from "react-native";
import * as animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { getUserName } from "./user.controller";

export default function Home() {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            const name = await getUserName();
            if (name) {
                setUserName(name);
            }
        };
      
        fetchUserName();
    }, []);

    return (
        <View style={styles.container}>
            <animatable.Image style={styles.containerLogo}
                source={require('../../../assets/logo.png')}
                resizeMode="contain"
                animation={'fadeInDown'} />

            <animatable.View delay={1000} animation='fadeInUp' style={styles.containerForm}>
                <Text style={styles.login}>Bem vindo, {userName}.</Text>
                
                <TouchableOpacity  onPress={() => navigation.navigate('ProfileScreen')} style={styles.button}>
                    <Text style={styles.buttonText}>Ir para o perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('UserList')} style={styles.button}>
                    <Text style={styles.buttonText}>Listar Usuários</Text>
                </TouchableOpacity>
            </animatable.View>
        </View>
    );
}
