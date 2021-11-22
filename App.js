import React, { useState } from 'react'
import { View, StyleSheet, ImageBackground, StatusBar, Pressable, Alert } from 'react-native'
import background from './src/assets/images/background.jpeg'

export default function App () {
  const [grid, setGrid] = useState([
    ['', '', ''], // 1st row
    ['', '', ''], // 2st row
    ['', '', ''] // 3st row
  ])

  const [currentTurn, setCurrentTurn] = useState('x')

  const onPress = (rowIndex, columnIndex) => {
    if (grid[rowIndex][columnIndex] !== '') {
      console.log('position already occupied')
    }

    setGrid((existingGrid) => {
      const updateGrid = [...existingGrid]
      updateGrid[rowIndex][columnIndex] = currentTurn
      return updateGrid
    })

    setCurrentTurn(currentTurn === 'x' ? 'o' : 'x')

    checkWinningState()
  }

  const checkWinningState = () => {
    //  check rows
    for (let row = 0; row < 3; row++) {
      const isRowXWinning = grid[row].every(cell => cell === 'x')

      const isRowOWinning = grid[row].every(cell => cell === 'o')

      if (isRowXWinning) Alert.alert('X won!')

      if (isRowOWinning) Alert.alert('O won!')
    }

    //  checks colums
    for (let col = 0; col < 3; col++) {
      let isColumnXwinner = true
      let isColumnOwinner = true

      for (let row = 0; row < 3; ) {
        if (grid[row][col] !== 'x') {
          isColumnXwinner = false
        }
        if (grid[row][col] !== 'o') {
          isColumnOwinner = false
        }
      }

      if (isColumnXwinner) {
        Alert.alert('X winner!')
      }

      if (isColumnOwinner) {
        Alert.alert('O winner!')
      }
    }
    //  check diagonals
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
      <ImageBackground source={background} style={styles.background} resizeMode='contain'>
        <View style={styles.gridContainer}>
          {grid.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <Pressable
                  style={styles.cell}
                  key={`row-${rowIndex}column-${columnIndex}`}
                  onPress={() => onPress(rowIndex, columnIndex)}
                >
                  {cell === 'o' && <View style={styles.circle} />}
                  {cell === 'x' && (
                    <View style={styles.cross}>
                      <View style={styles.crossLine} />
                      <View style={[styles.crossLine, styles.crossLineReverse]} />
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          ))}
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

  gridContainer: {
    width: '85%',
    aspectRatio: 1
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    margin: 4
  },

  cell: {
    flex: 1,
    width: 100,
    height: 100,
    borderWidth: 16,
    borderColor: 'transparent'
  },

  circle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 10
  },

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
