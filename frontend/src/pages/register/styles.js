import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CFCFCF',
    },
    containerLogo: {
        width: '80%',
        flex: 1,
        alignSelf: 'center',
        marginTop: '10%',
        
    },
    containerHeader: {
        alignItems: 'center',
        marginBottom: '5%',
        marginTop: '20%',
    },
    containerForm: {
        height: '80%',
        width: '90%',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingVertical: 20,
        borderRadius: 25,
        alignSelf: 'center',
        paddingBottom: '20%',
        marginBottom: '10%',
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'center',
    },
    login: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3A3A3A',
        alignSelf: 'center',
        paddingBottom: '5%',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3A3A3A',
        alignSelf: 'flex-start',
        paddingBottom: '2%',
        paddingTop: '4%',
        paddingLeft: '10%',
    },
    input: {
        width: '90%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingLeft: '5%',
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#2358FF',
        borderRadius: 25,
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '10%',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonRegister: {
        marginTop: 10,
        alignSelf: 'center',
    },
    registerText: {
        color: '#3A3A3A',
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: '2%',
        fontStyle: 'italic',
    },
});

export default styles;