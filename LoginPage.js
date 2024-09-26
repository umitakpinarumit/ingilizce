import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";

export default function LoginPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [error, setError] = useState(false);

  const correctNickname = "us";
  const correctPassword = "123";

  const handleLogin = () => {
    if (
      username.toLowerCase() === correctNickname.toLowerCase() &&
      password === correctPassword
    ) {
      setError(false);
      navigation.navigate("Categories");
    } else {
      setError(true);
      alert("The username or password you entered is incorrect.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Image source={require("./assets/kullanici.png")} style={styles.icon} />
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputRow}>
        <Image source={require("./assets/sifre.png")} style={styles.icon} />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, error && styles.errorInput]}
            placeholder="Enter password"
            value={password}
            secureTextEntry={secureText}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.touchIcon}
            onPress={() => setSecureText(!secureText)}
          >
            <Image
              source={
                secureText
                  ? require("./assets/kapaligoz.png")
                  : require("./assets/acikgoz.png")
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  touchIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
    width: 20,
    height: 20,
    marginRight: 9,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  loginButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
