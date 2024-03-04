import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import PortfolioDropdown from "./PortfolioDropDown";

const CustomModal = ({ modalVisibility, data, setModalVisibility, handleAddCoin }) => {
    const [coinID, setCoinID] = useState(null);
    const [entryPrice, setEntryPrice] = useState("");
    const [noOfCoins, setNoOfCoins] = useState("")

    const handleSelecion = (name) => {
        setCoinID(name);
        console.log(name);
    }
  return (
    <Modal visible={modalVisibility} transparent={true}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            width: "100%",
            backgroundColor: "#000",
            borderRadius: 20,
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              color: "white",
              margin: 8,
              textAlign: "center",
            }}
          >
            Enter Coin Details
          </Text>
          <PortfolioDropdown data={data} onSelect={handleSelecion} />
          <TextInput
            keyboardType="decimal-pad"
            placeholderTextColor={"#ccc"}
            placeholder="Enter Entry Price"
            value={entryPrice}
            onChangeText={(text) => setEntryPrice(text)}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              marginBottom: 10,
              width: "100%",
              color: "white",
            }}
          />
          <TextInput
            keyboardType="decimal-pad"
            placeholderTextColor={"#ccc"}
            placeholder="Enter No. of Coins"
            value={noOfCoins}
            onChangeText={(text) => setNoOfCoins(text)}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              marginBottom: 10,
              width: "100%",
              color: "white",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setModalVisibility((prev) => !prev);
              }}
              style={{
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 15,
                padding: 10,
                width: "30%",
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                CANCEL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisibility((prev) => !prev);
                handleAddCoin(coinID, entryPrice, noOfCoins);
                setCoinID("");
                setEntryPrice("");
                setNoOfCoins("");
              }}
              style={{
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 15,
                padding: 10,
                width: "30%",
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({});
