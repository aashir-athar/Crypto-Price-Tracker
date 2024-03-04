import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Screen from "./Screen";
import dataContext from "../context/Data";
import CustomCard from "../components/CustomCard";
import { FavContext } from "../context/FavContext";

const FavouriteCoinsScreen = ({ navigation }) => {
  const dataC = useContext(dataContext);
  const favContext = useContext(FavContext);
  const favCoins = dataC.mainData.filter((item) =>
    favContext.ids.includes(item.id)
  );

  const renderItem = ({ item }) => {
    let difference = item.lastPr - item.open24h;
    let absoluteChange = difference / item.open24h;
    let percentage = absoluteChange * 100;
    return (
      <CustomCard
        onPress={() =>
          navigation.navigate("Coin-Details", {
            symbol: item.symbol,
            price: item.lastPr,
            id: item.id.replace("USDT", ""),
            change24h: percentage,
            fundingRate: item.fundingRate,
            high24h: item.high24h,
            low24h: item.low24h,
          })
        }
        title={item.symbol.replace("USDT", "")}
        price={item.lastPr}
        change24h={percentage.toFixed(2)}
        id={item.id}
      />
    );
  };

  if (favCoins.length === 0) {
    return (
      <Screen>
        <Text style={styles.heading}>Favourite Coins</Text>
        <View
          style={{
            backgroundColor: "#222",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
            No favourite yet!
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.heading}>Favourite Coins</Text>
      <FlatList
        style={{ width: "100%" }}
        data={favCoins}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Screen>
  );
};

export default FavouriteCoinsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
});
