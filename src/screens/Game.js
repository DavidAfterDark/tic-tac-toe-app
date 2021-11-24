import React, { useState } from 'react'
import { View, StyleSheet, ImageBackground, StatusBar, Pressable } from 'react-native'
import background from '../assets/images/background.jpeg'

//  components
import AlertModal from '../components/AlertModal'

const Game = () => {
  const initialState = [
    ['', '', ''], // 1st row
    ['', '', ''], // 2st row
    ['', '', ''] // 3st row
  ]

  const [grid, setGrid] = useState(initialState)

  const [currentTurn, setCurrentTurn] = useState('x')

  const [winMessage, setWinMessage] = useState('')

  const onPress = (rowIndex, columnIndex) => {
    if (grid[rowIndex][columnIndex] !== '') {
      console.log('position already occupied')
    } else {
      setGrid((existingGrid) => {
        const updateGrid = [...existingGrid]
        updateGrid[rowIndex][columnIndex] = currentTurn
        return updateGrid
      })
      setCurrentTurn(currentTurn === 'x' ? 'o' : 'x')
      checkWinningState()
    }
  }

  const checkWinningState = () => {
    //  check rows
    for (let row = 0; row < 3; row++) {
      const isRowXWinning = grid[row].every(cell => cell === 'x')

      const isRowOWinning = grid[row].every(cell => cell === 'o')

      if (isRowXWinning) {
        playerXWin()
        break
      }

      if (isRowOWinning) {
        playerOWin()
        break
      }
    }

    //  checks colums
    for (let col = 0; col < 3; col++) {
      let isColumnXwinner = true
      let isColumnOwinner = true

      for (let row = 0; row < 3; row++) {
        if (grid[row][col] !== 'x') {
          isColumnXwinner = false
        }
        if (grid[row][col] !== 'o') {
          isColumnOwinner = false
        }
      }

      if (isColumnXwinner) {
        playerXWin()
        break
      }

      if (isColumnOwinner) {
        playerOWin()
        break
      }
    }

    //  check diagonals
    let isDiagonalLeftOWinning = true
    let isDiagonalLeftXWinning = true
    let isDiagonalRightOWinning = true
    let isDiagonalRightXWinning = true

    for (let i = 0; i < 3; i++) {
      if (grid[i][i] !== 'o') {
        isDiagonalLeftOWinning = false
      }

      if (grid[i][i] !== 'x') {
        isDiagonalLeftXWinning = false
      }

      if (grid[i][2 - i] !== 'o') {
        isDiagonalRightOWinning = false
      }

      if (grid[i][2 - i] !== 'x') {
        isDiagonalRightXWinning = false
      }
    }

    if (isDiagonalLeftOWinning) playerOWin()

    if (isDiagonalLeftXWinning) playerXWin()

    if (isDiagonalRightOWinning) playerOWin()

    if (isDiagonalRightXWinning) playerXWin()
  }

  const playerXWin = () => setWinMessage('🏆 Player X Win!')

  const playerOWin = () => setWinMessage('🏆 Player O Win!')

  const resetGame = () => {
    setGrid(initialState)
    setCurrentTurn('x')
    setWinMessage('')
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
        <AlertModal
          visible={!!winMessage}
          message={winMessage}
          button
          onPressButton={resetGame}
        />
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

export default Game
