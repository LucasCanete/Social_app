import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import {loginUser } from '../api/client';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogInScreen({route, navigation, setUser }) {
  //detect changes that affect UI
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    try {
      const result = await loginUser({ email, password });
      if (!result.user) {
        Alert.alert("Error", "No user returned from API");
        return;
      }

      console.log('success',result.message)
      
      //store the user in the async storage
      await AsyncStorage.setItem("user", JSON.stringify(result.user));
      await AsyncStorage.setItem("token", result.token);

      setUser(result.user);
      
      

    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>
          ¿No account yet? Sign Up Now
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 30,
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 12,
      borderRadius: 8,
      marginBottom: 15,
    },
    button: {
      backgroundColor: "#007AFF",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    link: {
      marginTop: 20,
      textAlign: "center",
      color: "#007AFF",
    },
});