import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Exercise({ route }) {
  const { exercise } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.exerciseText}>{exercise} Alıştırması</Text>
      {/* Burada alıştırmaları yapabilirsiniz */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  exerciseText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
