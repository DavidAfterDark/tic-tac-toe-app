import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ImageBackground, StatusBar, Text } from 'react-native'
import background from '../assets/images/background.jpeg'

//  components
import AlertModal from '../components/AlertModal'
import Cell from '../components/Cell'

const Game = () => {
  const initialState = [
    ['', '', ''], // 1st row
    ['', '', ''], // 2st row
    ['', '', ''] // 3st row
  ]

  const [grid, setGrid] = useState(initialState)

  const [currentTurn, setCurrentTurn] = useState('x')

  const [message, setMessage] = useState('')

  useEffect(() => {
    if (currentTurn === 'o') {
      setTimeout(() => {
        botTurn()
      }, 500)
    }
  }, [currentTurn])

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

      const winner = getWinner(grid)

      if (winner) {
        gameWon(winner)
      } else {
        checkTieState()
      }
    }
  }

  const getWinner = (winnerGrid) => {
    //  check rows
    for (let row = 0; row < 3; row++) {
      const isRowXWinning = winnerGrid[row].every(cell => cell === 'x')

      const isRowOWinning = winnerGrid[row].every(cell => cell === 'o')

      if (isRowXWinning) return 'x'

      if (isRowOWinning) return 'o'
    }

    //  checks colums
    for (let col = 0; col < 3; col++) {
      let isColumnXwinner = true
      let isColumnOwinner = true

      for (let row = 0; row < 3; row++) {
        if (winnerGrid[row][col] !== 'x') {
          isColumnXwinner = false
        }
        if (winnerGrid[row][col] !== 'o') {
          isColumnOwinner = false
        }
      }

      if (isColumnXwinner) return 'x'

      if (isColumnOwinner) return 'o'
    }

    //  check diagonals
    let isDiagonalLeftOWinning = true
    let isDiagonalLeftXWinning = true
    let isDiagonalRightOWinning = true
    let isDiagonalRightXWinning = true

    for (let i = 0; i < 3; i++) {
      if (winnerGrid[i][i] !== 'o') {
        isDiagonalLeftOWinning = false
      }

      if (winnerGrid[i][i] !== 'x') {
        isDiagonalLeftXWinning = false
      }

      if (winnerGrid[i][2 - i] !== 'o') {
        isDiagonalRightOWinning = false
      }

      if (winnerGrid[i][2 - i] !== 'x') {
        isDiagonalRightXWinning = false
      }
    }

    if (isDiagonalLeftXWinning || isDiagonalRightXWinning) return 'x'

    if (isDiagonalLeftOWinning || isDiagonalRightOWinning) return 'o'
  }

  const checkTieState = () => {
    if (!grid.some(row => row.some(cell => cell === ''))) inATie()
  }

  const gameWon = (player) => setMessage(`🏆  Player ${player.toLocaleUpperCase()} Win!`)

  const inATie = () => setMessage('(⊙_⊙;)  its a tie!')

  const resetGame = () => {
    setGrid(initialState)
    setCurrentTurn('x')
    setMessage('')
  }

  const botTurn = () => {
    //  collect all possible options
    const possibleOptions = []
    grid.forEach((row, rowIndex) => (
      row.forEach((cell, columnIndex) => {
        if (cell === '') {
          possibleOptions.push({ row: rowIndex, col: columnIndex })
        }
      })
    ))

    //  defend
    //  check if the opponents Wins if it takes one of the possible positions
    // possibleOptions.forEach(possibleOptions => {
    // })

    //  choose the best options
    const chooseOptions = possibleOptions[Math.floor(Math.random() * possibleOptions.length)]

    if (chooseOptions) {
      onPress(chooseOptions.row, chooseOptions.col)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
      <ImageBackground source={background} style={styles.background} resizeMode='contain'>
        <Text style={styles.currentTurn}>Current turn: {currentTurn.toLocaleUpperCase()}</Text>
        <View style={styles.gridContainer}>
          {grid.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <Cell
                  key={`row-${rowIndex}-column-${columnIndex}`}
                  onPress={() => onPress(rowIndex, columnIndex)}
                  cell={cell}
                />
              ))}
            </View>
          ))}
        </View>
        <AlertModal
          visible={!!message}
          message={message}
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

  currentTurn: {
    fontSize: 32,
    color: '#fff',
    position: 'absolute',
    top: 50
  },

  gridContainer: {
    width: '85%',
    aspectRatio: 1
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    margin: 4
  }
})

export default Game
