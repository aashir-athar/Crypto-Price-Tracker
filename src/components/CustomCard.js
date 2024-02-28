import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomCard = ({ price, id, title, change24h, onPress }) => {
  const [isPriceUp, setIsPriceUp] = useState(change24h > 0);

  useEffect(() => {
    setIsPriceUp(change24h > 0);
  }, [change24h]);

  const cardBackgroundColor = isPriceUp ? "#39cccc" : "#ff80b3";

  const cardTitleColor = isPriceUp ? "#000" : "#fff";

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
        <Text style={[styles.cardTitle, { color: cardTitleColor }]}>
          {title}
        </Text>
        <Text style={styles.cardPrice}>
          ${price} <Text style={styles.priceChange}>({change24h}%)</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 8,
  },
  card: {
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 20,
  },
  cardTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  cardPrice: {
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
  },
  priceChange: {
    fontSize: 14,
  },
});
