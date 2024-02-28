import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CustomHomeButton = ({ navigation, color }) => {
  const onPressHome = () => navigation.navigate("Home");

  return (
    <Pressable style={styles.homeButton} onPress={onPressHome}>
      <View style={styles.homeButtonInner}>
        <MaterialCommunityIcons name="home" size={40} color={"white"} />
      </View>
    </Pressable>
  );
};

export default CustomHomeButton;

const styles = StyleSheet.create({
  homeButton: {
    borderColor: "white",
    backgroundColor: "#222",
    borderWidth: 1,
    borderRadius: 50,
    width: 85,
    height: 85,
    justifyContent: "center",
    alignItems: "center",
    bottom: 35,
  },
  homeButtonInner: {
    backgroundColor: "#222",
    padding: 5,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
