import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FavContext } from "./../context/FavContext";
import Screen from "./Screen";
import Loading from "../components/Loading";
import MiniDataView from "../components/MiniDataView";
import PriceDisplay from "../components/PriceDisplay";

const CoinDetails = ({ route }) => {
  const {
    symbol,
    price,
    id,
    change24h,
    fundingRate,
    high24h,
    low24h,
    change15s,
  } = route.params;
  const favCoins = useContext(FavContext);
  const isFavourite = favCoins.ids.includes(id);

  const handleFavStatusChange = () => {
    if (isFavourite) {
      favCoins.removeFavourite(id);
    } else {
      favCoins.addFavourite(id);
    }
  };

  return (
    <Screen style={{ position: "relative" }}>
      {symbol ? (
        <View style={{ flex: 1, alignItems: "center" }}>
          <PriceDisplay
            symbol={symbol}
            price={price}
            color={change24h.toFixed(2)}
          />
          <MiniDataView
            label="Change (24h)"
            value={change24h.toFixed(2) + "%"}
          />
          {change15s && (
            <MiniDataView label="Change (15s)" value={change15s + "%"} />
          )}
          <MiniDataView
            label="Funding Rate"
            value={(fundingRate * 100).toFixed(4) + "%"}
          />

          <MiniDataView label="High (24h)" value={high24h} />
          <MiniDataView label="Low (24h)" value={low24h} />
          <TouchableOpacity
            style={{ position: "absolute", top: 10, right: 20 }}
            onPress={handleFavStatusChange}
            accessibilityLabel={
              isFavourite ? "Remove from favourites" : "Add to favourites"
            }
          >
            <MaterialCommunityIcons
              name={isFavourite ? "heart" : "heart-outline"}
              size={30}
              color={isFavourite ? "#ff80b3" : "#fff"}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <Loading />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default CoinDetails;
