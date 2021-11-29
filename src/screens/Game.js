import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { BOT_EASY, BOT_MEDIUM, MULTI_PLAYER } from '../constants'

//  components
import BackgroundContainer from '../components/BackgroundContainer'
import Header from '../components/Header'
import AlertModal from '../components/AlertModal'
import Cell from '../components/Cell'

//  utils
import { copyArray } from '../utils/copyArray'
import Buttom from '../components/Buttom'

const Game = () => {
  const route = useRoute()
  const params = route.params
  const navigation = useNavigation()

  console.log(params)

  const initialState = [
    ['', '', ''], // 1st row
    ['', '', ''], // 2st row
    ['', '', ''] // 3st row
  ]

  const [grid, setGrid] = useState(initialState)

  const [currentTurn, setCurrentTurn] = useState('x')

  const [message, setMessage] = useState('')

  const [botDifficulty, setBotDifficulty] = useState(BOT_EASY)

  useEffect(() => {
    if (currentTurn === 'o' && params.type !== MULTI_PLAYER) {
      setTimeout(() => {
        botTurn()
      }, 500)
    }
  }, [currentTurn])

  useEffect(() => {
    const winner = getWinner(grid)

    if (winner) {
      gameWon(winner)
    } else {
      checkTieState()
    }
  }, [grid])

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

    let chooseOptions

    if (botDifficulty === BOT_MEDIUM) {
      //  ↓↓↓ check if the opponents Wins if it takes one of the possible positions ↓↓↓

      //  attack
      possibleOptions.forEach((possibleOption) => {
        const copyGrid = copyArray(grid)

        copyGrid[possibleOption.row][possibleOption.col] = 'o'

        const winner = getWinner(copyGrid)

        if (winner === 'o') {
        //  attack that position
          chooseOptions = possibleOption
        }
      })

      if (!chooseOptions) {
      //  defend
        possibleOptions.forEach((possibleOption) => {
          const copyGrid = copyArray(grid)

          copyGrid[possibleOption.row][possibleOption.col] = 'x'

          const winner = getWinner(copyGrid)

          if (winner === 'x') {
          //  defend that position
            chooseOptions = possibleOption
          }
        })
      }
    }

    //  choose random
    if (!chooseOptions) {
      chooseOptions = possibleOptions[Math.floor(Math.random() * possibleOptions.length)]
    }

    if (chooseOptions) {
      onPress(chooseOptions.row, chooseOptions.col)
    }
  }

  const goBack = () => navigation.goBack()

  const setEasyBot = () => setBotDifficulty(BOT_EASY)

  const setMediumBot = () => setBotDifficulty(BOT_MEDIUM)

  return (
    <BackgroundContainer>
      <Header currentTurn={currentTurn} onPressBack={goBack} />
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
      <View style={styles.buttonGroup}>
        <Buttom
          onPress={setEasyBot}
          text='Easy'
          textStyle={styles.buttonText}
          buttomStyle={[
            styles.button,
            styles.buttonEasy,
            { backgroundColor: botDifficulty === BOT_EASY ? '#4F5686' : '#191F24' }
          ]}
        />
        <Buttom
          onPress={setMediumBot}
          text='Medium'
          textStyle={styles.buttonText}
          buttomStyle={[
            styles.button,
            { backgroundColor: botDifficulty === BOT_MEDIUM ? '#4F5686' : '#191F24' }
          ]}
        />
      </View>

      <AlertModal
        visible={!!message}
        message={message}
        button
        onPressButton={resetGame}
      />
    </BackgroundContainer>
  )
}

const styles = StyleSheet.create({
  gridContainer: {
    width: '85%',
    aspectRatio: 1
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    margin: 4
  },

  buttonGroup: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 50
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },

  buttonText: {
    fontSize: 20
  },

  buttonEasy: {
    marginRight: 50
  }
})

export default Game
