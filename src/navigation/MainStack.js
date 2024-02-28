import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home';
import CoinDetailsScreen from '../screens/CoinDetailsScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Coin-Details' component={CoinDetailsScreen} />
    </Stack.Navigator>
  )
}

export default MainStack

const styles = StyleSheet.create({})