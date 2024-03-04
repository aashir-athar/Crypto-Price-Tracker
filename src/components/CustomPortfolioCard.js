import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

const CustomPortfolioCard = ({
  title,
  id,
  currentPrice,
  numberOfCoins,
  onPress,
  entryPrice,
}) => {
  let initialInvestment = entryPrice * numberOfCoins;
  let priceChange = ((currentPrice - entryPrice) / entryPrice) * 100;
  let profit = (currentPrice - entryPrice) * numberOfCoins;
  const [isPriceUp, setIsPriceUp] = useState(null);

  useEffect(() => {
    setIsPriceUp(priceChange > 0);
  }, [priceChange]);

  const cardBackgroundColor = isPriceUp ? "#39cccc" : "#ff80b3";

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View
        style={[styles.container, { backgroundColor: cardBackgroundColor }]}
      >
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
          <Text style={[styles.value, { fontSize: 22, fontWeight: "bold" }]}>
            {numberOfCoins}
          </Text>
          <Text style={[styles.value, { fontSize: 22, fontWeight: "bold" }]}>
            ${currentPrice}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>
            Cost: <Text style={styles.value}>${entryPrice}</Text>
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>
            Investment:{" "}
            <Text style={styles.value}>${initialInvestment.toFixed(2)}</Text>
          </Text>
          <Text style={styles.label}>
            Now:{" "}
            <Text style={styles.value}>
              ${(initialInvestment + profit).toFixed(2)}
            </Text>
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>
            Profit:{" "}
            <Text style={styles.value}>
              ${profit.toFixed(2)}{" "}
              <Text style={styles.value}>({priceChange.toFixed(2)}%)</Text>{" "}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomPortfolioCard;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 5,
  },
  container: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
