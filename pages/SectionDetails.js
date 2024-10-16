import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SectionDetails({ route }) {
  const navigation = useNavigation();
  const { section } = route.params;

  const handleExercisePress = (exercise) => {
    navigation.navigate("Exercise", { exercise });
  };

  const handleQuizPress = () => {
    navigation.navigate("Quiz", { sectionId: section.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.exercises.map((exercise, index) => (
        <TouchableOpacity
          key={index}
          style={styles.exerciseBox}
          onPress={() => handleExercisePress(exercise)}
        >
          <Text>{exercise}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.quizBox} onPress={handleQuizPress}>
        <Text>Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  exerciseBox: {
    padding: 15,
    backgroundColor: "lightblue",
    marginVertical: 10,
    borderRadius: 10,
  },
  quizBox: {
    padding: 15,
    backgroundColor: "orange",
    marginVertical: 20,
    borderRadius: 10,
  },
});
