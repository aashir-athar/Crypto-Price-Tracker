import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import Screen from "../screens/Screen";

const PortfolioDropdown = ({ data, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const modalRef = useRef(null);

  const handleOpen = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  const handleSearch = (text) => {
    setSearchText(text);
    setFilteredData(
      data.filter((item) =>
        item.symbol.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: "#ccc",
        borderColor: "#222",
        borderWidth: 1,
        borderRadius: 25,
        margin: 10,
        marginHorizontal: 5,
        height: 120,
        width: 120,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {
        onSelect(item.symbol.replace("USDT", ""));
        setSearchText(item.symbol.replace("USDT", ""))
        handleClose();
      }}
    >
      <Text style={{ fontSize: 26, fontWeight: "bold", textAlign: "center" }}>
        {item.symbol.replace("USDT", "")}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownButton} onPress={handleOpen}>
        <Text style={{color: "#ccc", fontWeight: "bold", fontSize: 16}}>{searchText || "Select Symbol"}</Text>
      </TouchableOpacity>
      <Modal
        ref={modalRef}
        visible={isOpen}
        onRequestClose={handleClose}
        animationType="fade"
      >
        <Screen>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Search Symbol..."
              placeholderTextColor={"#ccc"}
              onChangeText={handleSearch}
              value={searchText}
            />
            <FlatList
              data={filteredData}
              style={{ gap: 20 }}
              numColumns={3}
              renderItem={renderItem}
              keyExtractor={(item) => item.symbol}
            />
          </View>
        </Screen>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add your desired styles here
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    width: "100%"
  },
  modalContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#222",
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    fontSize: 18,
    color: "#fff",
    borderRadius: 15
  },
});

export default PortfolioDropdown;
