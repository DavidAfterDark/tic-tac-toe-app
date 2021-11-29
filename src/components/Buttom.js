import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const Buttom = ({ onPress, text, textStyle, buttomStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, buttomStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(31, 86, 123, 0.8)',
    padding: 5,
    borderRadius: 10,
    justifyContent: 'center'
  },

  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  }
})

export default Buttom
