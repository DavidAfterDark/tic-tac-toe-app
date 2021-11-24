import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

//  components
import Circle from './Circle'
import Cross from './Cross'

const Cell = (props) => {
  const { onPress, cell } = props

  return (
    <Pressable
      style={styles.cell}
      onPress={onPress}
    >
      {cell === 'o' && <Circle />}
      {cell === 'x' && <Cross />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    width: 100,
    height: 100,
    borderWidth: 16,
    borderColor: 'transparent'
  }
})

export default Cell
