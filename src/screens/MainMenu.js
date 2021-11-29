import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { MULTI_PLAYER, SINGLE_PLAYER } from '../constants'

//  components
import BackgroundContainer from '../components/BackgroundContainer'
import Buttom from '../components/Buttom'

const MainMenu = () => {
  const navigation = useNavigation()

  const goSinglePlayerGame = () => navigation.navigate('Game', { type: SINGLE_PLAYER })

  const goMultiPlayerGame = () => navigation.navigate('MultiplayerMenu', { type: MULTI_PLAYER })

  return (
    <BackgroundContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Tic Tac Toe</Text>
        <Buttom
          onPress={goSinglePlayerGame}
          text='Single Player'
          buttomStyle={styles.buttomStyle}
          textStyle={styles.buttonTextStyles}
        />
        <Buttom
          onPress={goMultiPlayerGame}
          text='Multiplayer Player'
          buttomStyle={styles.buttomStyle}
          textStyle={styles.buttonTextStyles}
        />
      </View>
    </BackgroundContainer>
  )
}

export default MainMenu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },

  title: {
    fontSize: 50,
    letterSpacing: 5,
    marginTop: 75,
    marginBottom: 105
  },

  buttomStyle: {
    marginBottom: 50,
    height: 50
  },

  buttonTextStyles: {
    fontSize: 20
  }
})
