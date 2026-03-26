import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { useState } from 'react';

export default function NewPostScreen({route}) {
  const post = route.params?.post;

  const [title, setTitle] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [body, setBody] = useState(post?.body || '');
  const [tags, setTags] = useState(post?.tags || '');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Author</Text>
      <TextInput style={styles.input} value={author} onChangeText={setAuthor} />

      <Text style={styles.label}>Body</Text>
      <TextInput 
        style={[styles.input, { height: 100 }]} 
        value={body} 
        onChangeText={setBody} 
        multiline 
      />

      <Text style={styles.label}>Tags</Text>
      <TextInput style={styles.input} value={tags} onChangeText={setTags} />

    <TouchableOpacity style={styles.button} onPress={() => console.log(post ? "Post Updated" : "Post Created")}>
        <Text style={styles.buttonText}>{post ? "Update Post" : "Create Post"}</Text>
    </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
  backgroundColor: '#67ca9b',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
  marginTop: 20,
},

buttonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},

});