import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//  screens
import MainMenu from '../screens/MainMenu'
import Game from '../screens/Game'
import MultiplayerMenu from '../screens/MultiplayerMenu'

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
          name='MultiplayerMenu'
          component={MultiplayerMenu}
          options={{
            title: 'Multiplayer mode',
            headerBackButtonMenuEnabled: true,
            headerTransparent: true,
            headerTintColor: '#fff',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: 22 }
          }}
        />

        <Stack.Screen
          name='Game'
          component={Game}
          options={{
            title: 'Single Player',
            headerBackButtonMenuEnabled: true,
            headerTransparent: true,
            headerTintColor: '#fff',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: 22 }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
