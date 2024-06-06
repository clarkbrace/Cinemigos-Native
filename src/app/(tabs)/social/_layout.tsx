import React from "react";
import { Stack } from "expo-router";

const SocialStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Social" }} />
    </Stack>
  );
};

export default SocialStack;
