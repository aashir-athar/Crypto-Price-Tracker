import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MiniDataView = ({ label, value }) => (
  <View style={styles.miniViewContainer}>
    <Text style={styles.miniViewLabel}>{label}</Text>
    <Text style={styles.miniViewValue}>{value}</Text>
  </View>
);

export default MiniDataView;

const styles = StyleSheet.create({
  miniViewContainer: {
    padding: 15,
    width: "45%",
    margin: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", // Use a default background color
  },
  miniViewLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  miniViewValue: {
    fontSize: 16,
  },
});
