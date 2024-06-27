import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    title: {
        marginTop: '20%',
        marginBottom: '5%',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        backgroundColor: 'white', // Garante que o fundo seja branco
        width: '100%', // Usa 100% da largura disponível
    },
    userInfo: {
        flex: 1,
        color: 'black', 
        fontSize: 16,
        marginHorizontal: 15,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
    },
    buttonEdit: {
        marginLeft: 10,
        padding: 10,
        backgroundColor: '#add8e6',
        borderRadius: 10,
    },
    buttonDelete: {
        marginLeft: 10,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 10,
        color: 'white',
    },
    buttonDeleteText: {
        color: 'white',
    },

    list:{
        width: '95%',
        marginTop: '0%',
        paddingRight: '3%',
    }
});

export default styles;