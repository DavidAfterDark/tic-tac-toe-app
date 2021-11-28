import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//  screens
import MainMenu from '../screens/MainMenu'
import Game from '../screens/Game'

const Navigation = () => {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='MainMenu'
          component={MainMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Game'
          component={Game}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
