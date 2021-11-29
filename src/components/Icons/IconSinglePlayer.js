import * as React from 'react'
import Svg, { Circle, Path, Text } from 'react-native-svg'

function IconSinglePlayer (props) {
  return (
    <Svg
      data-name='Capa 1'
      viewBox='0 0 100 125'
      x='0px'
      y='0px'
      {...props}
    >
      <Circle
        cx={50.19}
        cy={22.14}
        r={20.78}
        transform='rotate(-22.61 50.199 22.13)'
      />
      <Path d='M50.19 50a38.56 38.56 0 00-38.56 38.59 10.12 10.12 0 0010.12 10.12h56.88a10.12 10.12 0 0010.12-10.12A38.56 38.56 0 0050.19 50z' />
      <Text
        y={120}
        fontSize='5px'
        fontWeight='bold'
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
      >
        from the Noun Project
      </Text>
    </Svg>
  )
}

export default IconSinglePlayer
