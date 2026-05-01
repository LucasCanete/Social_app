import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { deletePost } from '../api/client';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function PostDetailScreen({ navigation, route }) {
  const [user, setUser] = useState<any>(null);
  const { post } = route.params;
  console.log("POST DETAIL:", post);
  const handleDelete = () => {
    Alert.alert(
        "Delete Post",
        "Are you sure you want to delete this post?",
        [
        {
            text: "Cancel",
            style: "cancel",
        },
        {
            text: "Delete",
            style: "destructive",
            onPress: () => {
                deletePost(post.id);
                console.log("Post deleted");
                navigation.goBack();
            },
        },
        ]
    );};
    //loads user to decide wheter to show delete and edit buttons
    useEffect(() => {
      const loadUser = async () => {
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
          setUser(JSON.parse(userString));
        }
      };

      loadUser();
    }, []);
    const isOwner = user?.id === post.author?.id;

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
      <Text style={styles.title}>{post.title}</Text>

      {/* Meta */}
      <Text style={styles.meta}>
        {post.author.name} · {formatDate(post.date)}
      </Text>

      {/* Tags */}
      <Text style={styles.tags}>Tags: {post.tags || 'None'}</Text>

      {/* text */}
      <Text style={styles.body}>{post.text || 'No content'}</Text>

      {/* Buttons */}
      {isOwner && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditPost', { post })}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  meta: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },

  tags: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },

  body: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 30,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  editButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },

  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});