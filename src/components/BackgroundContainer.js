import React from 'react'
import { useRoute } from '@react-navigation/native'
import { StyleSheet, View, ImageBackground, StatusBar } from 'react-native'
import background from '../assets/images/background.jpeg'

const BackgroundContainer = ({ children }) => {
  const route = useRoute()

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
      <ImageBackground
        style={styles.background}
        source={background}
        resizeMode='contain'
        blurRadius={route.name === 'MainMenu' || route.name === 'MultiplayerMenu' ? 10 : 0}
      >
        {children}
      </ImageBackground>
    </View>
  )
}

export default BackgroundContainer

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
  }
})
