import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function MainPage({ navigation }) {
  const goProfile = () => {
    navigation.navigate("Profile");
  };
  return (
      <View style={styles.top_view}>
          
      <Pressable onPress={goProfile} style={styles.first_pressable_style}>
        <Text style={styles.first_pressable_text_style}> Profile </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  top_view: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  first_pressable_style: {
    borderWidth: 1,
    borderColor: "cyan",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  first_pressable_text_style: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
      
  }
});
