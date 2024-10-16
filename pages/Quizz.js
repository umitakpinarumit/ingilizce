import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Quiz({ route }) {
  const navigation = useNavigation();
  const { sectionId } = route.params;

  const handleQuizSubmit = (passed) => {
    if (passed) {
      // Quizi geçtiyse bir sonraki bölümü aç
      unlockNextSection(sectionId);
      Alert.alert("Tebrikler!", "Quizi geçtiniz. Bir sonraki bölüme geçebilirsiniz.");
      navigation.goBack();
    } else {
      Alert.alert("Quizi geçemediniz!", "Lütfen tekrar deneyin.");
    }
  };

  const unlockNextSection = (currentSectionId) => {
    // Bir sonraki bölümü aç
    if (currentSectionId === 1) {
      // Örnek olarak 2. bölümü açıyoruz
      // İsteğe göre burada mantık değişebilir
      setUnlockedSections((prev) => [...prev, 2]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.quizText}>Quiz Soruları Burada</Text>
      {/* Burada quiz soruları olacak */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => handleQuizSubmit(true)} // Quizin doğru ya da yanlış sonucuna göre değiştir
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  quizText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  submitButton: {
    padding: 15,
    backgroundColor: "green",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});
