import React from 'react'
import { StyleSheet, Text, View, StatusBar, Pressable } from 'react-native'

//  icons
import Icon from 'react-native-vector-icons/Ionicons'

const Header = ({ currentTurn, onPressBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onPressBack} style={styles.iconBack}>
          <Icon name='arrow-back' size={34} color='#fff' />
        </Pressable>
        <Text style={styles.title}>Tic Tac Toe</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.currentTurn}>Current turn:   </Text>
        <Text style={[styles.currentTurn, { color: currentTurn === 'x' ? '#1d5df2' : 'red', fontWeight: '700' }]}>
          {currentTurn.toLocaleUpperCase()}
        </Text>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: StatusBar.currentHeight + 10
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  iconBack: {
    position: 'absolute',
    left: 10
  },

  title: {
    fontSize: 24,
    color: '#fff'
  },

  currentTurn: {
    fontSize: 20,
    color: '#ffffff70',
    marginTop: 10
  }
})
