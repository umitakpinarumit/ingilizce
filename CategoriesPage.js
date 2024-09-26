import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function CategoriesPage({ navigation }) {
  return (
    <View style={styles.top_View}>
      <View style={styles.categoriesContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("WordMatching")}
          style={styles.touch}
        >
          <Text style={styles.text}>Kelime Eşleştirme</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("FillInTheBlanks")}
          style={styles.touch2}
        >
          <Text style={styles.text}>Boşluk Doldurma</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("FillInTheBlanks")}
          style={styles.touch2}
        >
          <Text style={styles.text}>Boşluk Doldurma</Text>
        </TouchableOpacity>
      </View>
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
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "90%",
  },
  touch: {
    borderRadius: 10,
    backgroundColor: "cyan",
    padding: 10,
    margin: 10,
    width: "40%",
    height: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
  touch2: {
    borderRadius: 10,
    backgroundColor: "pink",
    padding: 10,
    margin: 10,
    width: "40%",
    height: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
