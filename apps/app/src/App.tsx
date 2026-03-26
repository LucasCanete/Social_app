//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import NewPostScreen from './screens/NewPostScreen';
import PostDetailScreen from './screens/PostDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#67ca9b',
          },
          headerTintColor: '#e8ebee',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Posts" component={HomeScreen} />
        <Stack.Screen name="NewPost" component={NewPostScreen}  options={{ title: 'New Post' }}/>
        <Stack.Screen name="EditPost" component={NewPostScreen}  options={{ title: 'Edit Post' }}/>
        <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ title: 'Post Detail' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



