import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import dataContext from "../context/Data";
import CustomPortfolioCard from "../components/CustomPortfolioCard";
import Screen from "./Screen";
import PortfolioDropdown from "../components/PortfolioDropDown";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomModal from "../components/CustomModal";

const PortfolioScreen = () => {
  const [investedCoins, setInvestedCoins] = useState(null);
  const [modalVisibility, setModalVisibility] = useState(false);
  const dataC = useContext(dataContext);
  const portfolioContext = useContext(PortfolioContext);
  const portCoins = dataC.mainData.filter((dataObject) => {
    return portfolioContext.coins.some(
      (coinObject) => coinObject.id === dataObject.id
    );
  });

  useEffect(() => {
    // Assuming data is an array of objects with 'id' and 'currentPrice' properties
    if (portfolioContext.coins && dataC.mainData) {
      setInvestedCoins(
        portfolioContext.coins.map((portCoin) => ({
          ...portCoin,
          lastPr: dataC.mainData.find((item) => item.id === portCoin.id)
            ?.lastPr,
        }))
      );
    }
  }, [portfolioContext.coins, dataC.mainData]);

  const handleAddCoin = (id, entryPrice, numberOfCoins) => {
    if (id !== "" && entryPrice !== "" && numberOfCoins !== "") {
      portfolioContext.addCoin(id, entryPrice, numberOfCoins);
    } else {
      Alert.alert(
        "Missing Information",
        "Please fill in all required fields before submitting the form.",
        [
          {
            text: "OK",
            onPress: () => {
              setModalVisibility((prev) => !prev);
            },
          },
        ]
      );
    }
  };

  const handleRemoveCoin = (item, portfolioContext) => {
    Alert.alert(
      `Remove ${item.id} from Portfolio?`,
      `Are you sure you want to remove ${item.id} from your portfolio? This action cannot be undone.`,
      [
        {
          text: "Remove",
          onPress: async () => {
            try {
              await portfolioContext.removeCoin(item.id);
              Alert.alert("Success", `${item.id} removed from your portfolio.`);
            } catch (error) {
              console.error("Error removing coin:", error);
              Alert.alert(
                "Error",
                "An error occurred while removing the coin. Please try again later."
              );
            }
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const renderItem = ({ item }) => {
    return (
      <CustomPortfolioCard
        onPress={() => handleRemoveCoin(item, portfolioContext)}
        title={item.id}
        id={item.id}
        currentPrice={item.lastPr}
        numberOfCoins={item.numberOfCoins}
        entryPrice={item.entryPrice}
      />
    );
  };

  return (
    <Screen style={{ position: "relative" }}>
      <Text style={styles.heading}>Portfolio</Text>
      <TouchableOpacity
        onPress={() => {
          setModalVisibility((prev) => !prev);
        }}
        style={{
          position: "absolute",
          right: 20,
          top: 55,
          borderWidth: 1,
          borderRadius: 25,
          borderColor: "white",
          padding: 5,
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MaterialCommunityIcons name="plus" size={25} color={"white"} />
      </TouchableOpacity>
      <CustomModal
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        data={dataC.mainData}
        handleAddCoin={handleAddCoin}
      />
      <View>
        <FlatList
          style={{ width: "100%" }}
          data={investedCoins}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View></View>
      </View>
    </Screen>
  );
};

export default PortfolioScreen;

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
