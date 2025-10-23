import {
    SafeAreaView, Text, TouchableOpacity, StyleSheet,
    ImageBackground, TextInput
} from 'react-native';
import { useState } from "react";
import { supabase } from "../../src/supabaseClient";
//npm install react-native-toast-message
import Toast from "react-native-toast-message";

export default function App() {

    const [textUsuario, setUsuario] = useState('');
    const [textSenha, setSenha] = useState('');

    const dados = {
        usuario: textUsuario,
        senha: textSenha,
    }

    const enviarDados = async () => {
        
        const {data, error } = await supabase
            .from('usuarios')
            .insert([
                {nome: dados.usuario, senha: dados.senha}
            ])
            .select()

        if(error){
            Toast.show({
                type: "error",
                text1: "Erro!",
                text2: "Erro ao cadastrar",
            });
        }else{
            Toast.show({
                type: "success",
                text1: "Sucesso!",
                text2: "Dados Gravados com Sucesso!",
            });

            setUsuario("");
            setSenha("");
        }
    }

    return (
        <ImageBackground>
            <SafeAreaView style={styles.container}>
                <Text style={styles.titulo}>Fale Conosco</Text>
                <TextInput
                    style={styles.campoTexto}
                    value={textUsuario}
                    onChangeText={setUsuario}
                    placeholder='Informe seu USUARIO'
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