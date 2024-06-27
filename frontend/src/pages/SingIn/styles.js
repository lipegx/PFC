import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CFCFCF',
    },
    containerLogo: {
        width: '80%',
        alignSelf: 'center',
        marginTop: '10%',
    },
    containerHeader: {
       marginBottom: '15%',
       marginTop: '5%',
       paddingStart: '5%',
    },
    message:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '10%',
        paddingEnd: '10%',
        paddingTop: '10%',
    },
    login: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: '5%'
    },
    title: {
        fontSize: 18,
        color: '#000',
        marginTop: '8%',
        marginBottom: '5%'
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
        marginBottom: '1%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#2358FF',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginTop: '15%'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonRegister: {
        alignSelf: 'center',
        marginTop: '5%'
    },
    registerText: {
        color: '#A1A1A1',
        fontSize: 16,
        fontStyle: 'italic'
    }
});

export default styles;