import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "./Screen";

const CustomButton = ({ title, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: "50%",
        padding: 30,
        backgroundColor: "#39cccc",
        borderRadius: 50,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 30,
          textTransform: "uppercase",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};
const SwitchScreen = ({ navigation }) => {
  return (
    <Screen style={{ alignItems: "center", justifyContent: "center", gap: 20 }}>
      <CustomButton
        title={"1m Gainers"}
        onPress={() => navigation.navigate("OneMinuteGainer")}
      />
      <CustomButton
        title={"1h Gainers"}
        onPress={() => navigation.navigate("OneHourGainer")}
      />
    </Screen>
  );
};

export default SwitchScreen;

const styles = StyleSheet.create({});
