import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Import custom stacks for better code organization
import MainStack from "./MainStack";
import FavouriteStack from "./FavouriteStack";
import CustomHomeButton from "../components/CustomHomeButton";
import GainerStack from "./GainerStack";
import PortfolioScreen from "../screens/PortfolioScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Crypto Coins"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#222",
        },
        tabBarActiveTintColor: "#39cccc",
        tabBarInactiveTintColor: "#ccc"
      }}
    >
      <Tab.Screen
        name="Gainers"
        component={GainerStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="cash-refund"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Crypto Coins"
        component={MainStack}
        options={({ navigation }) => ({
          tabBarActiveTintColor: "#39cccc",
          tabBarButton: ({ size, color }) => (
            <CustomHomeButton navigation={navigation} color={color} />
          )
        })
      }
      />
      <Tab.Screen
        name="Favourites"
        component={FavouriteStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="account-heart"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="account"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
