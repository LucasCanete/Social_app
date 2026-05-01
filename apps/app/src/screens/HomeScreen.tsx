import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState, useCallback,useLayoutEffect  } from 'react';
import { getPosts } from '../api/client';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen({ navigation, setUser }) {
   

    //states for dynamically changing the screen
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    //use loading effects
    //automatically loads latest Posts
    useFocusEffect( 
        useCallback(() => {
            console.log("SCREEN FOCUSED");
            setLoading(true);
            loadPosts();
        }, [])
    );

    const loadPosts = async () => {
        try {
            const data = await getPosts();
            //console.warn("DATA:", data);;
            console.log(data);
            setPosts(data);
        } catch (error) {
            console.log("Error loading posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const logOut = async()=>{
        try{
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("token"); 
            console.log("User succesfully logout");
            setUser(null);
            //navigation.navigate("Log In"); Not necessary SetUser(null)automatically takes me to login
        } 
        catch(error){
            console.error("Error logging out user");
        }
    };

      //log out on right corner
    useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => (
        <TouchableOpacity onPress={logOut} style={{ marginRight: 15 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
            Logout
            </Text>
        </TouchableOpacity>
        ),
    });
    }, [navigation]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

  

    //ISO DATE to dd/mm/yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
        };
    
    
    return (
        <View style={styles.container}>
            
            {/* Title */}
            {/*<Text style={styles.title}>Posts</Text>*/}
        
            {/* List */}
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PostDetail', { post: item })}
                    >
                        <View style={styles.item}>
                        <Text>{item.title}</Text>
                        <Text style={styles.metaText}>{item.author?.name || item.author?.email} · {formatDate(item.date)}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        
            <StatusBar style="auto" />

            {/*Floating Button */}
            <TouchableOpacity 
                style={styles.fab} 
                onPress={() => navigation.navigate('NewPost')}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign:'center'
    },

    item: {
        padding: 15,
        backgroundColor: '#f2f2f2',
        marginBottom: 10,
        borderRadius: 10,
    },

    itemText: {
        fontSize: 16,
    },

    metaText: {
        fontSize: 12,
        color: '#888',
        marginTop: 6,
    },

    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#67ca9b',
        alignItems: 'center',
        justifyContent: 'center',

        // sombra (Android + iOS)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },

    fabText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 32,
    },
  

});