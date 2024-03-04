import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import dataContext from "./src/context/Data";
import bitget from "./src/api/bitget";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/navigation/TabNavigator";
import FavouriteCoinsProvider from "./src/context/FavContext";
import * as Notifications from "expo-notifications";
import PortfolioCoinsProvider from "./src/context/PortfolioContext";

const REFRESH_INTERVAL = 1000; // 1s

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const getNotificationPermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  let finalStatus = status;

  if (finalStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert("Failed!", "Failed to get notification permissions.");
    return;
  }
  return true;
};

const App = () => {
  const [mainData, setMainData] = useState(null);
  const [notifyMessage, setNotifyMessage] = useState(null);

  const fetchData = async () => {
    const response = await bitget.get(
      `/mix/market/tickers?productType=USDT-FUTURES`
    );
    if (!response.ok) {
      console.log(response.data);
      return;
    }

    const apiData = response.data.data.map((item) => {
      let difference = item.lastPr - item.open24h;
      let absoluteChange = difference / item.open24h;
      let percentage = absoluteChange * 100;
      return {
        ...item,
        id: item.symbol.replace("USDT", ""),
        percentage: percentage.toFixed(2),
        change15s: 0,
      };
    });
    setMainData(apiData);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const notificationSchedule = async (coin) => {
    let difference = coin.lastPr - coin.open24h;
    let absoluteChange = difference / coin.open24h;
    let percentage = absoluteChange * 100;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Lookout! ${coin.symbol.replace("USDT", "")}'s price. 📬`,
        body: `Price is ${coin.lastPr}. Change in Price: ${percentage.toFixed(
          2
        )}% in 24 hours.`,
      },
      trigger: { seconds: 30, repeats: false },
    });
  };

  const percentageChangeNotification = async (coin, message) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Lookout! ${coin.symbol.replace("USDT", "")}'s price. 📬`,
        body: message,
      },
      trigger: { seconds: 30, repeats: true },
    });
  };

  const checkChangeinPrice = () => {
    if (mainData) {
      mainData.map((coin) => {
        let difference = coin.lastPr - coin.open24h;
        let absoluteChange = difference / coin.open24h;
        let percentage = absoluteChange * 100;
        if (percentage.toFixed(2) >= 5 || percentage.toFixed(2) <= -5) {
          notificationSchedule(coin);
        }
      });
    }
  };

  let previousPercentages = {}; // Store previous percentages for each coin

  const checkChangeinPercentage = () => {
    if (mainData) {
      mainData.map((coin) => {
        let difference = coin.lastPr - coin.open24h;
        let absoluteChange = difference / coin.open24h;
        let percentage = absoluteChange * 100;

        // Compare with percentage from 30 seconds ago
        if (previousPercentages[coin.symbol]) {
          const previousPercentage = previousPercentages[coin.symbol];
          const difference1 = percentage - previousPercentage;
          console.log(difference1);
          if (
            Math.abs(difference1) >= 2 ||
            difference1 === 5 ||
            difference1 === -5
          ) {
            // Trigger notification for significant change
            setNotifyMessage(
              `Price is ${coin.lastPr}. Change in Price: ${difference1.toFixed(
                2
              )}% in 30 seconds.`
            );
            percentageChangeNotification(coin, notifyMessage);
          }
        }
        // Store current percentage for comparison in the next iteration
        previousPercentages[coin.symbol] = percentage;
      });

      // Clear previous percentages after 30 seconds
      setTimeout(() => {
        previousPercentages = {};
      }, 30000); // Adjust this timeout if needed
    }
  };

  useEffect(() => {
    if (mainData) {
      getNotificationPermissions();
      checkChangeinPercentage();
    }
  }, []);

  useEffect(() => {
    if (mainData) {
      checkChangeinPrice();
    }
    const interval = setInterval(checkChangeinPrice, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <dataContext.Provider value={{ mainData, setMainData }}>
      <PortfolioCoinsProvider>
        <FavouriteCoinsProvider>
          <View style={{ flex: 1, backgroundColor: "#222" }}>
            <NavigationContainer>
              <TabNavigator />
            </NavigationContainer>
          </View>
        </FavouriteCoinsProvider>
      </PortfolioCoinsProvider>
    </dataContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
