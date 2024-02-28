import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import Screen from "./Screen";
import CustomCard from "../components/CustomCard";
import Loading from "../components/Loading";
import dataContext from "../context/Data";

const Home = ({ navigation }) => {
  const [cryptoData, setCryptoData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dataC = useContext(dataContext);

  useEffect(() => {
    setCryptoData(dataC.mainData);
  }, [dataC.mainData]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (!text) {
      setCryptoData(dataC.mainData);
    } else {
      const filteredData = dataC.mainData?.filter((item) =>
        item.symbol.toLowerCase().includes(text.toLowerCase())
      );
      setCryptoData(filteredData);
    }
  };

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
          })
        }
        title={item.symbol.replace("USDT", "")}
        price={item.lastPr}
        change24h={(percentage).toFixed(2)}
        id={item.id}
      />
    );
  };

  return (
    <Screen>
      <Text style={styles.heading}>Crypto Coin List</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholderTextColor="white"
          placeholder="Search a coin by symbol..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {cryptoData ? (
        <FlatList
          style={styles.listContainer}
          data={cryptoData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          initialNumToRender={50}
        />
      ) : (
        <Loading />
      )}
    </Screen>
  );
};

export default Home;

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
  searchContainer: {
    padding: 8,
    width: "100%",
  },
  searchInput: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 15,
    padding: 16,
    color: "#fff",
  },
  listContainer: {
    width: "100%",
  },
});
