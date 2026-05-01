//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from './screens/HomeScreen';
import NewPostScreen from './screens/NewPostScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import LogInScreen from './screens/LogInScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  
  //detect dynamic changes
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //load user
  useEffect(() => {
    const loadUser = async () => {
      const userString = await AsyncStorage.getItem("user");

      if (userString) {
        setUser(JSON.parse(userString));
      }

      setLoading(false);
    };

    loadUser();
  }, []);
  

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
        }}
        >{user ? (
          // logged user
         //Pass setUser to the homescren to ble able to log out
          <>
            <Stack.Screen name="Posts">  
              {(props) => <HomeScreen {...props} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="NewPost" component={NewPostScreen} options={{ title: 'New Post' }} />
            <Stack.Screen name="PostDetail" component={PostDetailScreen}  options={{ title: 'Post Detail' }} />
            <Stack.Screen name="EditPost" component={NewPostScreen}  options={{ title: 'Edit Post' }}/>
          </>
        ) : (
          //not logged user
          <>
            <Stack.Screen name="Log In">
              {(props)=><LogInScreen {...props} setUser={setUser}/>}
            </Stack.Screen> 
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
      </NavigationContainer>
    );
}
        



