import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import { supabase  } from '@/src/supabaseClient';
import Toast from 'react-native-toast-message';

import { useState } from 'react';

export default function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const autenticar = async () => {
        Toast.show({
            type: 'success',
            text1: 'Sucesso',
            text2: 'Login efetuado com sucesso!'
        })
    }

    return(
        <View style={style.container}>
            <View style={style.card}>
        <Text style={style.titulo}> Autenticar </Text> 
        <TextInput 
          style={style.caixaText} 
          placeholder='Informe seu Email' 
          value={email} 
          onChangeText={setEmail} 
        /> 
        <TextInput 
          style={style.caixaText} 
          placeholder='Informe sua senha' 
          value={senha} 
          onChangeText={setSenha} 
          secureTextEntry
        />
        <View style={style.botao}>
            <Button 
            title='Login' 
            onPress={autenticar}
            color = '#5CBD0F'
            />
        </View>
      </View>
      <Toast /> 
    </View> 
    )
}

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center'
    },
    card:{
        width: '40%',
    },
    titulo:{
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        marginBottom: 15
    },
    caixaText:{
        backgroundColor: '#fff',
        color: '#000',
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#c8d537ff',
        marginBottom: 10,
        borderRadius: 5
    },
    botao:{
        width: '50%',
        alignSelf: 'center',
        marginTop: 10
    }
})