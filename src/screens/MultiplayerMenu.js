import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

//  components
import BackgroundContainer from '../components/BackgroundContainer'
import Buttom from '../components/Buttom'
import { MULTI_PLAYER, LOCAL } from '../constants'

const MultiplayerMenu = () => {
  const navigation = useNavigation()

  const goLocalMode = () => navigation.navigate('Game', { type: MULTI_PLAYER, mode: LOCAL })

  return (
    <BackgroundContainer>
      <View style={styles.container}>
        <Buttom
          onPress={goLocalMode}
          text='Local'
          buttomStyle={styles.buttomStyle}
          textStyle={styles.buttonTextStyles}
        />
        <Buttom
          onPress={() => console.log('coming soon')}
          text='Online'
          buttomStyle={styles.buttomStyle}
          textStyle={styles.buttonTextStyles}
        />
      </View>
    </BackgroundContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },

  buttomStyle: {
    height: 50,
    marginTop: 25,
    marginBottom: 28
  },

  buttonTextStyles: {
    fontSize: 20
  }
})

export default MultiplayerMenu
