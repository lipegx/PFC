import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert } 
    from "react-native";
import * as animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'

export  default function Welcome() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                
                    <animatable.Image 
                    animation="flipInY"
                    source={require('../../../assets/logo.png')}
                    style={{width: '100%'}}
                    resizeMode="contain"
                    />
            </View>
            <animatable.View delay={600} animation = "fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>
                    MUDAH! Agora é o momento!
                </Text>
                <Text style={styles.text}>
                    Faça o login para começar
                </Text>

                <TouchableOpacity 
                style={styles.button}
                onPress={ () => navigation.navigate('SignIn')}>
                    <Text>Acessar</Text>
                </TouchableOpacity>
                </animatable.View>

        </View>
    );
}