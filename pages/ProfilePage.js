import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ProfilePage() {
  return (
    <View style={styles.top_view}>
      <Text>ProfilePage</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  top_view: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});