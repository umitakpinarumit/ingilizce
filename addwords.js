import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, FlatList, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddWord() {
  const [turkishWord, setTurkishWord] = useState('');
  const [englishWord, setEnglishWord] = useState('');
  const [wordList, setWordList] = useState([]); // Eklenen kelimelerin listesi

  // AsyncStorage'dan kelimeleri çekmek için useEffect kullanıyoruz
  useEffect(() => {
    loadWords();
  }, []);

  const loadWords = async () => {
    try {
      const storedWords = await AsyncStorage.getItem('wordPairs');
      if (storedWords) {
        setWordList(JSON.parse(storedWords));
      }
    } catch (error) {
      Alert.alert('Hata', 'Kelimeleri yüklerken bir hata oluştu.');
    }
  };

  const saveWord = async () => {
    if (!turkishWord || !englishWord) {
      Alert.alert('Hata', 'Lütfen her iki kelimeyi de girin.');
      return;
    }

    const newWord = { turkce: turkishWord, ingilizce: englishWord };

    try {
      const storedWords = await AsyncStorage.getItem('wordPairs');
      const currentWords = storedWords ? JSON.parse(storedWords) : [];

      const updatedWords = [...currentWords, newWord];
      await AsyncStorage.setItem('wordPairs', JSON.stringify(updatedWords));

      // Yeni kelimeyi listeye ekle
      setWordList(updatedWords);

      Alert.alert('Başarılı', 'Kelime başarıyla eklendi!');
      setTurkishWord('');
      setEnglishWord('');
    } catch (error) {
      Alert.alert('Hata', 'Kelimeleri kaydederken bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Türkçe Kelime"
        value={turkishWord}
        onChangeText={setTurkishWord}
      />
      <TextInput
        style={styles.input}
        placeholder="İngilizce Kelime"
        value={englishWord}
        onChangeText={setEnglishWord}
      />
      <Button title="Kelimeyi Kaydet" onPress={saveWord} />

      <FlatList
        data={wordList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.wordItem}>
            <Text>{item.turkce} - {item.ingilizce}</Text>
          </View>
        )}
        style={styles.wordList}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1, // Flex ekleyerek sayfanın tamamını kaplamasını sağladık
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  wordList: {
    marginTop: 20,
    flex: 1, // FlatList'in ekranın geri kalanını kaplamasını sağlar
  },
  wordItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});