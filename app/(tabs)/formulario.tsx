import {
    SafeAreaView, Text, TouchableOpacity, StyleSheet,
    ImageBackground, TextInput, Alert
} from 'react-native';
import { useState } from "react";
import { supabase } from "../../src/supabaseClient";
import Toast from "react-native-toast-message";

export default function App() {

    const [textUsuario, setUsuario] = useState('');
    const [textSenha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const enviarDados = async () => {
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: textUsuario,
            password: textSenha,
        });

        if (error) {
            setLoading(false);
            Alert.alert("Erro de Cadastro", error.message); 
            Toast.show({
                type: "error",
                text1: "Erro!",
                text2: error.message || "Erro ao cadastrar usuário.",
            });
            return; 
        } 
        
        setLoading(false);
        Toast.show({
            type: "success",
            text1: "Sucesso!",
            text2: "Cadastro efetuado! Verifique seu e-mail para confirmar.",
        });

        setUsuario("");
        setSenha("");
    };

    return (
        <ImageBackground>
            <SafeAreaView style={styles.container}>
                <Text style={styles.titulo}>Fale Conosco</Text>
                <TextInput
                    style={styles.campoTexto}
                    value={textUsuario}
                    onChangeText={setUsuario}
                    placeholder='Informe seu E-MAIL'
                    autoFocus
                />
                <TextInput
                    style={styles.campoTexto}
                    value={textSenha}
                    onChangeText={setSenha}
                    placeholder='Informe sua SENHA'
                />
                <TouchableOpacity style={styles.botao} onPress={enviarDados}>
                    <Text style={styles.textoBotao}>Cadastrar usuario</Text>
                </TouchableOpacity>

                <Toast />
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        verticalAlign: 'middle',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 45,
        padding: 5,
        alignItems: 'center',
        textAlign: 'center',
    },
    campoTexto: {
        backgroundColor: '#fff',
        color: '#000',
        width: '80%',
        height: 45,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 5,
    },
    botao: {
        backgroundColor: '#21468cff',
        color: '#fff',      
        textAlign: 'center',   
        padding: 10,           
        width: '50%',         
        borderRadius: 10,       
        fontFamily: 'sans-serif' 
    },
    textoBotao: {
                 color: '#FFFFFF',
                 fontSize: 16,
             }
});