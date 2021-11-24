import React from 'react'
import { View, StyleSheet } from 'react-native'

const Cross = () => {
  return (
    <View style={styles.cross}>
      <View style={styles.crossLine} />
      <View style={[styles.crossLine, styles.crossLineReverse]} />
    </View>
  )
}

const styles = StyleSheet.create({
  cross: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center'
  },

  crossLine: {
    position: 'absolute',
    width: 10,
    height: 75,
    backgroundColor: 'white',
    borderRadius: 10,
    transform: [{
      rotate: '45deg'
    }]
  },

  crossLineReverse: {
    transform: [{
      rotate: '-45deg'
    }]
  }
})

export default Cross
