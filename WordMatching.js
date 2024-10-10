import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import data from "./data.json";

// Rastgele sıralama fonksiyonu
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export default function WordMatching() {
  const [wordPairs, setWordPairs] = useState([]);
  const [selectedTurkish, setSelectedTurkish] = useState(null);
  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [isMatched, setIsMatched] = useState(false);  // Eşleşme durumu
  const fadeAnimTurkish = useRef(new Animated.Value(1)).current;
  const fadeAnimEnglish = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // İlk kelimeleri getirme
    setWordPairs(generateNewWords());
  }, []);

  // Kelimeleri ve eşleşmelerini hazırlama
  const generateNewWords = () => {
    const filteredData = data.filter((item) => item.seviyesi === "A2");
    const selectedWords = getRandomItems(filteredData, 3);  // 3 çift kelime
    const turkishWords = shuffleArray(selectedWords.map((item) => item.turkce));
    const englishWords = shuffleArray(selectedWords.map((item) => item.ingilizce));

    return selectedWords.map((word, index) => ({
      turkce: turkishWords[index],
      ingilizce: englishWords[index],
      correctIngilizce: word.ingilizce,
    }));
  };

  // Kelime seçimi
  const handleSelect = (item, isTurkish) => {
    if (isTurkish) {
      setSelectedTurkish(item);
    } else {
      setSelectedEnglish(item);
    }
  };

  // İki kelime seçildiğinde eşleşme kontrolü
  useEffect(() => {
    if (selectedTurkish && selectedEnglish) {
      const isMatch = wordPairs.some(
        (pair) =>
          pair.turkce === selectedTurkish.turkce &&
          pair.correctIngilizce === selectedEnglish.ingilizce
      );

      if (isMatch) {
        setIsMatched(true);  // Eşleşme doğruysa animasyonu tetikle
        handleMatchAnimation();
      } else {
        // Yanlış eşleşme, seçimleri sıfırla
        setSelectedTurkish(null);
        setSelectedEnglish(null);
      }
    }
  }, [selectedTurkish, selectedEnglish]);

  // Eşleşme animasyonu ve yeni kelimelerin getirilmesi
  const handleMatchAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnimTurkish, {
        toValue: 0, // Türkçe kutusu kaybolur
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimEnglish, {
        toValue: 0, // İngilizce kutusu kaybolur
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setWordPairs(generateNewWords());  // Yeni kelimeleri getir
      resetSelections();
    });
  };

  // Seçimleri sıfırla ve animasyonu başa sar
  const resetSelections = () => {
    setSelectedTurkish(null);
    setSelectedEnglish(null);
    fadeAnimTurkish.setValue(1);
    fadeAnimEnglish.setValue(1);
    setIsMatched(false);
  };

  const getRandomItems = (arr, n) => {
    let result = new Array(n), len = arr.length, taken = new Array(len);
    if (n > len) throw new RangeError("getRandomItems: more elements taken than available");
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };

  return (
    <View style={styles.top_container}>
      <View style={styles.container}>
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Türkçe Kelimeler:</Text>
          {wordPairs.map((item, index) => (
            <Animated.View style={{ opacity: fadeAnimTurkish }} key={index}>
              <TouchableOpacity
                style={[
                  styles.box,
                  selectedTurkish === item && styles.selectedBox,
                ]}
                onPress={() => handleSelect(item, true)}
              >
                <Text style={styles.text}>{item.turkce}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        <View style={styles.column}>
          <Text style={styles.columnHeader}>İngilizce Kelimeler:</Text>
          {wordPairs.map((item, index) => (
            <Animated.View style={{ opacity: fadeAnimEnglish }} key={index}>
              <TouchableOpacity
                style={[
                  styles.box2,
                  selectedEnglish === item && styles.selectedBox,
                ]}
                onPress={() => handleSelect(item, false)}
              >
                <Text style={styles.text}>{item.ingilizce}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>
    </View>
  );
}

// Stil tanımlamaları
const styles = StyleSheet.create({
  top_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
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
    marginLeft: 20,
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
