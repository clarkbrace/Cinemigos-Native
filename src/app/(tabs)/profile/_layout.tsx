import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ProfileStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default ProfileStack;
