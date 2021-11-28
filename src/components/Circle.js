import React from 'react'
import { View, StyleSheet } from 'react-native'

const Circle = () => {
  return <View style={styles.circle} />
}

const styles = StyleSheet.create({
  circle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    borderColor: 'red',
    borderWidth: 10
  }
})

export default Circle
