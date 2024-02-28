import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PriceDisplay = ({ symbol, price, color }) => (
  <View style={styles.priceContainer}>
    <Text style={styles.symbolText}>{symbol.replace("USDT", "")}</Text>
    <Text
      style={[styles.priceText, { color: color > 0 ? "#39cccc" : "#ff80b3" }]}
    >
      ${price}
    </Text>
  </View>
);

export default PriceDisplay;

const styles = StyleSheet.create({
  priceContainer: {
    padding: 20,
    width: "100%",
    alignItems: "center",
  },
  symbolText: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#fff",
  },
  priceText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#ccc",
  },
});
