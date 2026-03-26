import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function PostDetailScreen({ navigation, route }) {
  const { post } = route.params;
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
            
                console.log("Post deleted");
                navigation.goBack();
            },
        },
        ]
    );
    };

  return (
    <View style={styles.container}>
      
      {/* Title */}
      <Text style={styles.title}>{post.content}</Text>

      {/* Meta */}
      <Text style={styles.meta}>
        {post.author} · {post.date}
      </Text>

      {/* Tags */}
      <Text style={styles.tags}>Tags: {post.tags || 'None'}</Text>

      {/* Body */}
      <Text style={styles.body}>{post.body || 'No content'}</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditPost',{ post }) }>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>

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