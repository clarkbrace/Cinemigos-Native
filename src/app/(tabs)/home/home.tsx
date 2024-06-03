import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SwipeableMovie from "@components/SwipeableMovie";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <SwipeableMovie />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
