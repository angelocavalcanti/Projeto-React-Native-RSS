import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, ToastAndroid } from 'react-native';
import { Context } from '../context/FeedListContext';

const AddFeedScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const {addFeed} = useContext(Context);
    return (
        <View>
            {/* <Text>Implementar formulário de adição de RSS feeds, passando título e link. Demais informações devem ser obtidas do arquivo XML (tag channel), como imagem, descrição, etc.</Text> */}

            <Text style={styles.label}>Título:</Text>
            <TextInput 
                style={styles.input}   
                value={title} 
                onChangeText={text => setTitle(text)}>
            </TextInput>
            <Text style={styles.label}>Link:</Text>
            <TextInput 
                autoCapitalize="none" 
                autoCorrect={false}
                placeholder="http://www..."
                style={styles.input}   
                value={link} 
                onChangeText={text => setLink(text)}>
            </TextInput>
            <Button
                title="Adicionar Feed" 
                onPress={() => {
                    if(title != null && title != ""){
                        if(link != null && link != "" ){
                            addFeed(title, link, ()=>navigation.navigate('Index'));
                            ToastAndroid.show('Feed adicionado com sucesso!', ToastAndroid.SHORT); 
                        }else ToastAndroid.show('Digite um link!', ToastAndroid.SHORT);
                    }else ToastAndroid.show('Digite um título!', ToastAndroid.SHORT);
                }}>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        marginBottom: 15,
        padding: 5,
        margin: 5
      },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5,
        marginTop: 10
    }
});

export default AddFeedScreen;
