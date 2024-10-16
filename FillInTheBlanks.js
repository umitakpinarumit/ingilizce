import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FillInTheBlanks() {
  return (
    <View style={styles.top_View}>
      <Text>Fill In The Blanks Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  top_View: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
