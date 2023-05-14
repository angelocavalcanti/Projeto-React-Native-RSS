import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import IndexScreen from './src/screens/IndexScreen';
import ShowFeedScreen from './src/screens/ShowFeedScreen';
import AddFeedScreen from './src/screens/AddFeedScreen';
import { Feather } from '@expo/vector-icons';
import { Provider as FeedListProvider } from './src/context/FeedListContext';
import { Provider as FeedProvider } from './src/context/FeedContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen 
        name="Index" 
        component={IndexScreen} 
        options={({navigation}) => ({
          headerRight: () => (
            // Para deixar o ícone como "botão" clicável e ao clicar carrega a tela de adição de feed:
            <TouchableOpacity onPress={() => {
              console.log('implementado ícone de adição');
              navigation.navigate("Add"); // chama AddFeedScreen
            }}>
              {/* Ícone + para adicionar feed: */}
              <Feather name="plus" size={30} /> 
            </TouchableOpacity>
          )
        })
        }
      />
      <Stack.Screen name="Show" component={ShowFeedScreen} />
      <Stack.Screen name="Add" component={AddFeedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <FeedListProvider>
      <FeedProvider>
        <App />
      </FeedProvider>
    </FeedListProvider>
  );
};