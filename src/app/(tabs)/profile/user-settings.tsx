import { View, Text, Platform } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

const userSettingsScreen = () => {
  return (
    <View>
      <Stack.Screen options={{ title: `Settings` }} />
      <Text>userSettingsScreen</Text>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default userSettingsScreen;
