import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; // Sayfa geçişini takip etmek için

const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export default function Eslestirme({ navigation }) {
  const [wordList, setWordList] = useState([]); // Tüm kelimelerin listesi
  const [currentWords, setCurrentWords] = useState([]); // Anlık eşleştirilecek kelimeler
  const [selectedTurkish, setSelectedTurkish] = useState(null);
  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [matchedWords, setMatchedWords] = useState([]); // Eşleştirilmiş kelimeler

  // Sayfa her açıldığında resetlemek için
  useFocusEffect(
    React.useCallback(() => {
      resetGame(); // Oyun resetlensin
      return () => resetGame(); // Sayfadan çıkıldığında da resetlenir
    }, [])
  );

  const resetGame = () => {
    setSelectedTurkish(null);
    setSelectedEnglish(null);
    setMatchedWords([]);
    loadWords(); // Kelimeleri baştan yükle
  };

  const loadWords = async () => {
    try {
      const storedWords = await AsyncStorage.getItem("wordPairs");
      const userWords = storedWords ? JSON.parse(storedWords) : [];

      // Kelimelere eklenme sırasına göre ID atayalım ve eşleşme durumu ile sıralama numarası ekleyelim
      const processedWords = userWords.map((word, index) => ({
        id: index + 1, // Eklenme sırasına göre id
        turkce: word.turkce,
        ingilizce: word.ingilizce,
        eslesmeDurumu: 0, // Eşleşmemiş durum
        siraNumarasi: index + 1, // İlk başta eklenme sırası olacak
      }));

      // Eğer yeterli kelime varsa kelimeleri set et
      if (processedWords.length >= 5) {
        // Kelimeleri rastgele bir sıraya sokalım
        const shuffledWords = shuffleArray(processedWords);
        setWordList(shuffledWords); // Tüm kelimeleri state'e al
        setNewWordPair(shuffledWords); // İlk kelime çiftini başlat
      } else {
        alert("Yeterli kelime yok! Lütfen daha fazla kelime ekleyin.");
      }
    } catch (error) {
      console.log("Error loading words:", error);
    }
  };

  const setNewWordPair = (words) => {
    const remainingWords = words.filter((word) => word.eslesmeDurumu === 0);

    if (remainingWords.length === 0) {
      Alert.alert("Tebrikler!", "Tüm kelimeleri doğru eşleştirdiniz!");
      return;
    }

    const nextBatch = remainingWords.slice(0, 5); // Ekrana gelecek yeni kelime çifti
    const shuffledTurkish = shuffleArray(nextBatch.map((word) => ({ id: word.id, text: word.turkce })));
    const shuffledEnglish = shuffleArray(nextBatch.map((word) => ({ id: word.id, text: word.ingilizce })));

    setCurrentWords({
      turkishWords: shuffledTurkish,
      englishWords: shuffledEnglish,
    });
  };

  const handleSelect = (item, isTurkish) => {
    if (isTurkish) {
      setSelectedTurkish(item);
    } else {
      setSelectedEnglish(item);
    }

    if (selectedTurkish && selectedEnglish) {
      if (selectedTurkish.id === selectedEnglish.id) {
        // Doğru eşleşme, eşleşme durumunu güncelle
        const updatedWordList = wordList.map((word) =>
          word.id === selectedTurkish.id ? { ...word, eslesmeDurumu: 1 } : word
        );
        setWordList(updatedWordList);

        // Eğer tüm kelimeler doğru eşleşmişse oyunu bitir
        if (updatedWordList.every((word) => word.eslesmeDurumu === 1)) {
          Alert.alert("Tebrikler!", "Tüm kelimeleri doğru eşleştirdiniz!");
        } else {
          // Yeni kelime seti ayarla
          setNewWordPair(updatedWordList);
        }

        // Seçimleri sıfırla
        setSelectedTurkish(null);
        setSelectedEnglish(null);
      } else {
        // Yanlış eşleşme olursa seçimleri sıfırla
        setTimeout(() => {
          setSelectedTurkish(null);
          setSelectedEnglish(null);
        }, 500);
      }
    }
  };

  return (
    <View style={styles.top_container}>
      {/* Kelime Eşleştirme Alanı */}
      <View style={styles.container}>
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Türkçe Kelimeler:</Text>
          {currentWords.turkishWords &&
            currentWords.turkishWords.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.box, selectedTurkish === item && styles.selectedBox]}
                onPress={() => handleSelect(item, true)}
              >
                <Text style={styles.text}>{item.text}</Text>
              </TouchableOpacity>
            ))}
        </View>

        <View style={styles.column}>
          <Text style={styles.columnHeader}>İngilizce Kelimeler:</Text>
          {currentWords.englishWords &&
            currentWords.englishWords.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.box2, selectedEnglish === item && styles.selectedBox]}
                onPress={() => handleSelect(item, false)}
              >
                <Text style={styles.text}>{item.text}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top_container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  columnHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  box: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginVertical: 10,
    width: 120,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "cyan",
  },
  box2: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginVertical: 10,
    width: 120,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "pink",
  },
  selectedBox: {
    borderColor: "blue",
    borderWidth: 2,
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
});
