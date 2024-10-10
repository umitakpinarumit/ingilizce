import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import data from "./data.json";

const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export default function Eslestirme() {
  const filteredData = data.filter((item) => item.seviyesi === "A2");
  const [wordPairs, setWordPairs] = useState([]);
  const [selectedTurkish, setSelectedTurkish] = useState(null);
  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [matchCount, setMatchCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    setWordPairs(generateNewWords());
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      alert(`Oyun bitti! Doğru eşleşme sayısı: ${matchCount}`);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (matchCount >= 10) {
      alert("Tebrikler, kazandınız!");
    }
  }, [matchCount]);

  const generateNewWords = () => {
    const selectedWords = getRandomItems(filteredData, 3);
    const englishWords = shuffleArray(selectedWords.map((item) => item.ingilizce));
    return selectedWords.map((word, index) => ({
      turkce: word.turkce,
      ingilizce: englishWords[index],
      correctIngilizce: word.ingilizce,
    }));
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

  const handleSelect = (item, isTurkish) => {
    if (isTurkish) {
      setSelectedTurkish(item);
    } else {
      setSelectedEnglish(item);
    }

    if (selectedTurkish && selectedEnglish) {
      const isMatch = wordPairs.some(
        (pair) =>
          pair.turkce === selectedTurkish.turkce &&
          pair.correctIngilizce === selectedEnglish.ingilizce
      );

      if (isMatch) {
        setMatchCount((prev) => prev + 1);
        setWordPairs(generateNewWords()); // Yeni kelimeleri karıştır
      }
      setSelectedTurkish(null);
      setSelectedEnglish(null);
    }
  };

  return (
    <View style={styles.top_container}>
      {/* Doğru eşleşme sayısı ve süre */}
      <View style={styles.header}>
        <Text style={styles.matchCount}>Doğru Eşleşmeler: {matchCount}</Text>
        <Text style={styles.timer}>Kalan Süre: {timeLeft}s</Text>
      </View>

      {/* Kelime Eşleştirme Alanı */}
      <View style={styles.container}>
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Türkçe Kelimeler:</Text>
          {wordPairs.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.box,
                selectedTurkish === item && styles.selectedBox,
              ]}
              onPress={() => handleSelect(item, true)}
            >
              <Text style={styles.text}>{item.turkce}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.column}>
          <Text style={styles.columnHeader}>İngilizce Kelimeler:</Text>
          {wordPairs.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.box2,
                selectedEnglish === item && styles.selectedBox,
              ]}
              onPress={() => handleSelect(item, false)}
            >
              <Text style={styles.text}>{item.ingilizce}</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  matchCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  timer: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
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
