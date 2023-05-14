import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import { Context } from '../context/FeedListContext'

const IndexScreen = ({ navigation }) => {
    const { state, deleteFeed, deleteAll , restoreState} = useContext(Context);

    useEffect(() => {
        restoreState();
      }, []);

    return (
        <>
            {state != null && state != "" ? 
            <View>
                <FlatList
                data={state}
                keyExtractor={(rssfeed) => rssfeed.urlFeed}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.urlFeed })}>
                            <View style={styles.row}>
                            <Text style={styles.title}>{item.titulo}</Text>
                                <TouchableOpacity onPress={() => { 
                                    console.log('delete_feed IndexScreen implementado');
                                    deleteFeed(item.urlFeed);
                                }}>
                                    <Feather style={styles.icon} name="trash" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            /> 
            <Button title="Apagar tudo" onPress={()=>deleteAll()} />
            </View> : <View style={styles.vazio}><Text style={styles.vazio}>Nenhum Feeds RSS cadastrado</Text></View>}
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    },
    vazio:{
        fontSize: 25,
        padding: 10,
        width:'100%',
        textAlign:'center'
    }
});

export default IndexScreen;
