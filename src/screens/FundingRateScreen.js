import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Screen from "./Screen"; // Use named import for clarity
import Loading from "../components/Loading";
import CustomCard from "../components/CustomCard";
import dataContext from "../context/Data";

const FundingRateScreen = ({ navigation }) => {
  const GmainData = useContext(dataContext);
  const [sortedData, setSortedData] = useState(null);
  const [previousData, setPreviousData] = useState(null);

  const calculatePercentageChange = (current, previous) => {
    if (!previous || !current) return 0;

    const change = current.lastPr - previous.lastPr;
    const percentageChange = (change / previous.lastPr) * 100;
    return percentageChange;
  };

  useEffect(() => {
    const fetchData = () => {
      setPreviousData(GmainData.mainData); // Store new data with timestamp
    };

    const intervalId = setInterval(fetchData, 60000); // Fetch 15 seconds
    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [previousData]);

  // useEffect(() => {
  //   if (!GmainData.mainData) return;

  //   const sorted = [...GmainData.mainData].sort(
  //     (a, b) => b.percentage - a.percentage
  //   );

  //   if (!sortedData || JSON.stringify(sortedData) !== JSON.stringify(sorted)) {
  //     setSortedData(sorted.slice(0, 50));
  //   }
  // }, [GmainData.mainData]);

  useEffect(() => {
    if (!GmainData.mainData) return;

    if (previousData) {
      const updatedData = GmainData.mainData.map((currentCoin) => {
        const previousCoin = previousData.find(
          (prevCoin) => prevCoin.symbol === currentCoin.symbol
        );

        const changePercentage = calculatePercentageChange(
          currentCoin,
          previousCoin
        );

        // console.log(currentCoin.symbol, changePercentage);
        return { ...currentCoin, change15s: changePercentage };
      });
      // Sort the updated data based on changePercentage (descending order)
      updatedData.sort((a, b) => b.change15s - a.change15s);

      // Update mainData state
      setSortedData(updatedData);
    }
  }, [GmainData.mainData]);

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
            id: item.id,
            change24h: percentage,
            fundingRate: item.fundingRate,
            high24h: item.high24h,
            low24h: item.low24h,
            change15s: item.change15s.toFixed(2),
          })
        }
        title={item.symbol.replace("USDT", "")}
        price={item.lastPr}
        change24h={item.change15s.toFixed(2)}
        id={item.id}
      />
    );
  };

  return (
    <Screen>
      <Text style={styles.heading}>Top Gainers (1m)</Text>
      {sortedData ? (
        <FlatList
          data={sortedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
        />
      ) : (
        <Loading />
      )}
    </Screen>
  );
};

export default FundingRateScreen;

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
