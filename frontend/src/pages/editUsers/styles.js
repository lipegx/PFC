import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        marginTop: '10%',
        marginBottom: '5%',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'center',
        paddingBottom: '20%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    subTitle:{
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#2358FF',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: '30%'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
export default styles;
