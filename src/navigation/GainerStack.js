import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CoinDetailsScreen from '../screens/CoinDetailsScreen';
import OneMinuteGainerScreen from '../screens/OneMinuteGainerScreen';
import SwitchScreen from '../screens/SwitchScreen';
import OneHourGainerScreen from '../screens/OneHourGainerScreen';

const Stack = createNativeStackNavigator();

const GainerStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen name='Switch Screen' component={SwitchScreen} />
        <Stack.Screen name='OneMinuteGainer' component={OneMinuteGainerScreen} />
        <Stack.Screen name='OneHourGainer' component={OneHourGainerScreen} />
        <Stack.Screen name='Coin-Details' component={CoinDetailsScreen} />
    </Stack.Navigator>
  )
}

export default GainerStack

const styles = StyleSheet.create({})