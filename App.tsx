import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet, Image } from 'react-native';
import { loadModelAndPredict } from './loadModel';  // Model yükleme fonksiyonu
import * as tf from '@tensorflow/tfjs';

const images = [
  require('./assets/images/bathroom.jpg'),
  require('./assets/images/bedroom.jpg'),
  require('./assets/images/childrens_room.jpg'),
  require('./assets/images/hallway.jpg'),
  require('./assets/images/office.jpg'),
  require('./assets/images/kitchen.jpg'),
  require('./assets/images/livingroom.jpg'),
];

export default function App() {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [prediction, setPrediction] = useState<tf.Tensor | null>(null);

  useEffect(() => {
    const loadAndPredict = async () => {
      const result = await loadModelAndPredict();
      if (result && result instanceof tf.Tensor) {
        setPrediction(result);  // Sadece tf.Tensor olduğunda kaydediyoruz
      } else {
        console.log('Model tahmini başarısız veya geçersiz sonuç:', result);
      }
    };
    loadAndPredict();
  }, []);

  const handleCommentSubmit = () => {
    if (comment.trim() === '') {
      alert('Lütfen geçerli bir yorum girin.');
      return;
    }

    setComments([...comments, comment]);
    setComment('');

    if (comments.length < 9 && imageIndex < images.length - 1) {
      setImageIndex(imageIndex + 1);
      setCurrentImage(images[imageIndex + 1]);
    } else {
      alert('Tüm resimler tamamlandı!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={currentImage} style={styles.image} />
      </View>
      <View style={styles.commentContainer}>
        {comments.map((cmt, index) => (
          <Text key={index} style={styles.commentText}>{cmt}</Text>
        ))}
        <TextInput
          style={styles.input}
          placeholder="Yorumunuzu girin"
          value={comment}
          onChangeText={setComment}
        />
        <Button title="Yorumu Gönder" onPress={handleCommentSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  commentContainer: {
    marginTop: 20,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
