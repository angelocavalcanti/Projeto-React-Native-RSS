import { StackRouter } from '@react-navigation/native';
import createDataContext from './createDataContext';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const saveFeeds = async (feeds) => { 
    try {
        await AsyncStorage.setItem('feeds', JSON.stringify(feeds));
    }
    catch(e) { 
        console.log(e);
    }
}

const clearStorage = async () => { 
    try {
        await AsyncStorage.removeItem('feeds');
        alert('Limpou feeds salvos');
    }
    catch(e) { 
        alert('Falha ao limpar feeds');
    }
}

const feedListReducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'add_feed':
            console.log('Chamada add_feed FeedListContext implementado');
            newState = [...state, {
                titulo: action.payload.titulo, 
                urlFeed:action.payload.urlFeed,
            }];
            saveFeeds(newState);
            return newState;
        case 'delete_feed':
            console.log('Chamada delete_feed FeedListContext implementado');
            //console.log(action.payload);
            newState = state.filter((rssFeeds) => rssFeeds.urlFeed != action.payload); // deleta o feed
            saveFeeds(newState);
            return newState;
        case 'restore_state':
            console.log('Chamada restore_state implementado. Atualiza estado com tudo que está salvo');
            return action.payload;
        case 'delete_all':
            console.log('implementar -> deletando todos os feeds');
            clearStorage();
            return []; // retorna array vazio
        default:
            return state;
    }
};

const addFeed = dispatch => {
    return (titulo, urlFeed, callback) => {
        console.log('addFeed FeedListContext implementado');
        dispatch({ type: 'add_feed', payload: { titulo, urlFeed } }) // recebe o título e url do feed para adicionar
        if(callback){
            callback(); // função passada como argumento (pode ser uma função que carrega outra tela)
        } 
    };
};

const deleteFeed = dispatch => {
    return (id) => {
        console.log('deleteFeed FeedListContext implementado');
        Alert.alert('Exclusão de Feed', 'Deseja realmente exluir o Feed '+ id +' ?', [{ // cria um alerta para que seja confirmada a exclusão do feed
            text: 'Excluir',
            onPress: () => {
                dispatch({ type: 'delete_feed', payload: id }); // recebe o id do feed e o deleta
                console.log('Excluir pressionado')
            },
        },
        {
            text: 'Cancelar', 
            onPress: () => console.log('Cancelar pressionado'),
            style: 'cancel'
        },
        ]);
    };
};

const restoreState = dispatch => async () => { 
    try {
        const savedFeeds = await AsyncStorage.getItem('feeds');
        if (!savedFeeds) {
            console.log('nada foi salvo ainda...');
        }
        else { 
            dispatch({type:'restore_state', payload:JSON.parse(savedFeeds)});
        }
    }
    catch(e) { 
        console.log(e);
    }
};


const deleteAll = dispatch => {
    return () => {
        console.log('implementado - deleteAll FeedListContext deletar todos os feeds rss');
        Alert.alert('Exclusão', 'Deseja realmente exluir TODOS os Feeds RSS?', [{ // cria um alerta para que seja confirmada a exclusão de todos os feeds
            text: 'Excluir',
            onPress: () => {
                dispatch({type: 'delete_all', payload:{} });
                console.log('Excluir pressionado')
            },
        },
        {
            text: 'Cancelar', 
            onPress: () => console.log('Cancelar pressionado'),
            style: 'cancel'
        },
        ]);
    }
}

// const rssFeeds = [
//     {
//         titulo: 'G1 - Todas as notícias',
//         urlFeed: 'https://g1.globo.com/rss/g1/',
//         descricao: '',
//         urlSite: '',
//         urlImagem: ''
//     },
//     {
//         titulo: 'G1 - Brasil',
//         urlFeed: 'https://g1.globo.com/rss/g1/brasil/',
//         descricao: '',
//         urlSite: '',
//         urlImagem: ''
//     },
//     {
//         titulo: 'G1 - Tecnologia e Games',
//         urlFeed: 'https://g1.globo.com/rss/g1/tecnologia/',
//         descricao: '',
//         urlSite: '',
//         urlImagem: ''
//     },
//     {
//         titulo: 'Jovem Nerd',
//         urlFeed: 'http://jovemnerd.com.br/rss',
//         descricao: 'testando',
//         urlSite: 'google.com',
//         urlImagem: ''
//     }
    
// ];

export const { Context, Provider } = createDataContext(
    feedListReducer,
    { addFeed, deleteFeed, restoreState, deleteAll },
    //  rssFeeds
    [] // inicia os feeds com uma lista vazia
);
