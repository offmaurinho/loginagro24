import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { supabase } from "../../src/supabaseClient";

export default function consultarContato(){

    type Usuarios = {
        id: number;
        nome: string;
        senha: string;
    }

    const[usuarios, setUsuarios] = useState<Usuarios[]>([]);
    const[carregar, setCarregar] = useState(true);

    const carregarUsarios = async () =>{
        setCarregar(true);
        const { data, error } = await supabase
            .from("usuarios")
            .select("*")
            .order("id", { ascending: false });

        if(error){
            console.error("Erro ao consultar dados: ", error.message);
        }else{
            setUsuarios(data || []);
        }
        
        setCarregar(false);
    };

    useFocusEffect(useCallback(()=>{carregarUsarios();},[]));

    const renderItem = ({ item }: { item: Usuarios }) => (
             <View style={styles.tableRow}>
               <Text style={styles.cell}>{item.id}</Text>
               <Text style={styles.cell}>{item.nome}</Text>
               <Text style={styles.cell}>{item.senha}</Text>
             </View>
           );
        
           // Componente para o cabeçalho da tabela
           const TableHeader = () => (
             <View style={styles.tableHeader}>
               <Text style={styles.headerCell}>ID</Text>
               <Text style={styles.headerCell}>Nome</Text>
               <Text style={styles.headerCell}>Senha</Text>
             </View>
           );

    const gerarItem = ({ item }:{ item: Usuarios})=>(
        <View>
            <Text>{ item.id }</Text>
            <Text>{ item.nome }</Text>
            <Text>{ item.senha }</Text>
        </View>
    );

    return(
             <SafeAreaView style={styles.container}>
               {carregar ? (
                 <Text>Carregando dados...</Text>
               ) : usuarios.length === 0 ? (
                 <Text>Nenhum usuario encontrado</Text>
               ) : (
                 <FlatList
                   data={usuarios}
                   renderItem={renderItem}
                   keyExtractor={(item) => item.id.toString()}
                   ListHeaderComponent={TableHeader} // Adiciona o cabeçalho
                   style={styles.table}
                 />
               )}
             </SafeAreaView>
        );
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#fff",
      },
      table: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
      },
      tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f1f8ff',
        borderBottomWidth: 1,
        borderColor: '#ddd',
      },
      headerCell: {
        flex: 1,
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
      },
      tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
      },
      cell: {
        flex: 1,
        padding: 10,
        textAlign: 'left',
      },
    });