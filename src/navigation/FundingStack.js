import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FundingRateScreen from '../screens/FundingRateScreen';
import CoinDetailsScreen from '../screens/CoinDetailsScreen';

const Stack = createNativeStackNavigator();

const FundingStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen name='FundingScreen' component={FundingRateScreen} />
        <Stack.Screen name='Coin-Details' component={CoinDetailsScreen} />
    </Stack.Navigator>
  )
}

export default FundingStack

const styles = StyleSheet.create({})