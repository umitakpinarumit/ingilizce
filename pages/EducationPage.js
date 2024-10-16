import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EducationPage() {
  const navigation = useNavigation();
  const [unlockedSections, setUnlockedSections] = useState([1]); // Sadece ilk bölüm açık

  const sections = [
    { id: 1, title: "Geniş Zaman", exercises: ["Alıştırma 1", "Alıştırma 2", "Alıştırma 3"] },
    { id: 2, title: "Geçmiş Zaman", exercises: ["Alıştırma 1", "Alıştırma 2", "Alıştırma 3"] },
    // Diğer bölümleri buraya ekleyebilirsiniz
  ];

  const handleSectionPress = (section) => {
    if (unlockedSections.includes(section.id)) {
      navigation.navigate("SectionDetails", { section });
    } else {
      Alert.alert("Bu bölüme erişebilmek için önceki bölümü tamamlayın!");
    }
  };

  return (
    <View style={styles.container}>
      {sections.map((section) => (
        <TouchableOpacity
          key={section.id}
          style={[
            styles.sectionBox,
            unlockedSections.includes(section.id) ? styles.unlocked : styles.locked
          ]}
          onPress={() => handleSectionPress(section)}
        >
          <Text style={styles.sectionTitle}>{section.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionBox: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  unlocked: {
    backgroundColor: "lightgreen",
  },
  locked: {
    backgroundColor: "lightgray",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
