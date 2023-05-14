import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { FlatList} from 'react-native-gesture-handler';
import { Context as FeedListContext } from '../context/FeedListContext'
import { Context as FeedContext } from '../context/FeedContext'
import { useContext } from 'react';

const ShowFeedScreen = ({ route, navigation }) => {
    const feedListContext = useContext(FeedListContext);
    const feedID = route.params.id;
    const feed = feedListContext.state.find((feed) => feed.urlFeed === feedID);
    const { state, fetchItems } = useContext(FeedContext);
    // fetchItems(feed.urlFeed);

    useEffect( // hook usado para evitar loop ao abrir a tela com as notícias dos feeds
        () => {
            fetchItems(feed.urlFeed);
        }, []
    )

    const abrirLink = (link) => {
        console.log('abrirLink ShowFeedScreen implementado -> manda o usuário para o link da notícia');
        Linking.openURL(link); // abre o link em um navegador
    }
    
    return (
        <>
            <FlatList
                data={state}
                keyExtractor={(item) => item.link}
                renderItem={({ item }) => {
                    //atualmente só exibe o título, faça com que apareça data de publicação, descrição (pode cortar em 100 ou 200 caracteres para não ficar muito grande), e imagem (caso tenha)
                    //ao clicar em uma notícia, devemos chamar a função abrirLink que direciona o usuário para o link da notícia
                    let descricao = item.descricao ? item.descricao.slice(0,220) : '';
                    // console.log("DESCRIÇÃO="+descricao);
                    // console.log(item);
                    return (
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => abrirLink(item.link) }>
                                <Text style={styles.titulo}>
                                    {item.titulo}{'\n'}
                                </Text>
                                {item.imagem != null && item.imagem != "" ? 
                                    <Image
                                        style={styles.image} 
                                        source={{ uri: item.imagem }} 
                                    /> 
                                    :  
                                    <Image 
                                        style={styles.imagem} 
                                        source={{ uri: 'https://via.placeholder.com/250x120/?text=sem imagem' }} 
                                    /> 
                                }
                                <Text style={styles.descricao}>
                                   {descricao}[...]{'\n'}
                                </Text>
                                <Text style={styles.dataPublicacao}>
                                    Publicado em: {item.dataPublicacao}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </>
    );
};

//altere os estilos como desejar para melhorar o layout
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray',
        marginEnd: 5
    },
    titulo: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign:'justify'
    },
    image: {
        //pode alterar largura e altura como desejar
        width: 350,
        height: 150,
        borderRadius: 4,
        margin: 5,
        alignContent:'center'
    },
    descricao: {
        fontSize: 10,
        textAlign:'justify'
    },
    dataPublicacao: {
        fontSize: 12,
        fontStyle: 'italic',
        textAlign: 'left'
    },
    icon: {
        fontSize: 24
    }
});

export default ShowFeedScreen;
