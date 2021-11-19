import React, { useState } from 'react'
import { View, StyleSheet, ImageBackground, StatusBar } from 'react-native'
import background from './src/assets/images/background.jpeg'

export default function App () {
  const [grid, setGrid] = useState([
    ['o', '', ''], // 1st row
    ['', 'x', 'x'], // 2st row
    ['o', '', ''] // 3st row
  ])

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
      <ImageBackground source={background} style={styles.background} resizeMode='contain'>
        <View style={styles.grid}>
          <View style={styles.circle} />

          <View style={styles.cross}>
            <View style={styles.crossLine} />
            <View style={[styles.crossLine, styles.crossLineReverse]} />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242D34'
  },

  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 18
  },

  grid: {
    borderWidth: 1,
    width: '75%',
    aspectRatio: 1
  },

  circle: {
    position: 'absolute',
    top: 1 * 109,
    left: 1 * 109,
    width: 75,
    height: 75,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 10,
    marginBottom: 20
  },

  cross: {
    position: 'absolute',
    top: 2 * 109,
    left: 2 * 109,
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
