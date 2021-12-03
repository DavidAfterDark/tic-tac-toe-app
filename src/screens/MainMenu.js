import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { SINGLE_PLAYER, MULTI_PLAYER } from '../constants'
import { withAuthenticator } from 'aws-amplify-react-native'

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

export default withAuthenticator(MainMenu)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },

  title: {
    fontSize: 50,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginTop: 75,
    marginBottom: '40%'
  },

  buttomStyle: {
    marginBottom: 50,
    height: 50
  },

  buttonTextStyles: {
    fontSize: 20
  }
})
