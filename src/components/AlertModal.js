import React from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'

//  components
import Buttom from './Buttom'

const AlertModal = ({ visible, message, button, onPressButton }) => {
  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType='fade'
    >
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={[styles.message, button && { marginBottom: 20 }]}>{message}</Text>
          {button && <Buttom onPress={onPressButton} text='Restart' />}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  body: {
    backgroundColor: 'rgb(224, 224, 224)',
    padding: 20,
    borderRadius: 10
  },

  message: {
    color: '#000',
    fontSize: 22
  }
})

export default AlertModal
