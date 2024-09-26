import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import data from "./data.json";

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

export default function WordMatching() {
  const filteredData = data.filter((item) => item.seviyesi === "A2");

  const getRandomItems = (arr, n) => {
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError(
        "getRandomItems: more elements taken than available"
      );
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };

  const [wordPairs, setWordPairs] = useState(() => {
    const selectedWords = getRandomItems(filteredData, 3);
    const turkishWords = selectedWords.map((item) => item.turkce);
    const englishWords = selectedWords.map((item) => item.ingilizce);

    const shuffledTurkish = shuffleArray(turkishWords.slice());
    const shuffledEnglish = shuffleArray(englishWords.slice());

    return selectedWords.map((word, index) => ({
      turkce: shuffledTurkish[index],
      ingilizce: shuffledEnglish[index],
      correctIngilizce: word.ingilizce, // Doğru İngilizce karşılık
    }));
  });

  const [selectedTurkish, setSelectedTurkish] = useState(null);
  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSelect = (item, isTurkish) => {
    if (isTurkish) {
      setSelectedTurkish(item);
    } else {
      setSelectedEnglish(item);
    }
  };

  const handleCheckMatch = () => {
    if (selectedTurkish && selectedEnglish) {
      // `selectedTurkish` in doğru İngilizce karşılığını `selectedEnglish` ile karşılaştır
      const isMatch = wordPairs.some(
        (pair) =>
          pair.turkce === selectedTurkish.turkce &&
          pair.correctIngilizce === selectedEnglish.ingilizce
      );
      setIsCorrect(isMatch);
      setSelectedTurkish(null);
      setSelectedEnglish(null);
    }
  };

  return (
    <View style={styles.top_container}>
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

      <View style={styles.resultContainer}>
        <Button
          title="Onayla"
          onPress={handleCheckMatch}
          disabled={!selectedTurkish || !selectedEnglish}
        />
        {isCorrect !== null && (
          <Text style={styles.resultText}>
            {isCorrect ? "Doğru!" : "Yanlış!"}
          </Text>
        )}
        <Button
          title="Yeniden Başlat"
          onPress={() => {
            const selectedWords = getRandomItems(filteredData, 4);
            const turkishWords = selectedWords.map((item) => item.turkce);
            const englishWords = selectedWords.map((item) => item.ingilizce);

            const shuffledTurkish = shuffleArray(turkishWords.slice());
            const shuffledEnglish = shuffleArray(englishWords.slice());

            setWordPairs(
              selectedWords.map((word, index) => ({
                turkce: shuffledTurkish[index],
                ingilizce: shuffledEnglish[index],
                correctIngilizce: word.ingilizce,
              }))
            );
            setSelectedTurkish(null);
            setSelectedEnglish(null);
            setIsCorrect(null);
          }}
        />
      </View>
    </View>
  );
}

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
  resultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
