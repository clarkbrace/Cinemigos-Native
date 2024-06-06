import React from "react";
import { Stack } from "expo-router";

const HomeStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
};

export default HomeStack;
