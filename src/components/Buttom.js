import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const Buttom = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={[styles.text]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(31, 86, 123, 0.8)',
    padding: 5,
    borderRadius: 10
  },

  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  }
})

export default Buttom
