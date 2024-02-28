import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FavouriteCoinsScreen from '../screens/FavouriteCoinsScreen';
import CoinDetailsScreen from '../screens/CoinDetailsScreen';

const Stack = createNativeStackNavigator();

const FavouriteStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen name='Favourite-Coins' component={FavouriteCoinsScreen} />
        <Stack.Screen name='Coin-Details' component={CoinDetailsScreen} />
    </Stack.Navigator>    
  )
}

export default FavouriteStack

const styles = StyleSheet.create({})