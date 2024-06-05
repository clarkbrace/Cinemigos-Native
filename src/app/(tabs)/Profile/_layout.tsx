import React from "react";
import { Stack } from "expo-router";

const ProfileStack = () => {
  return (
    <Stack>
      <Stack.Screen name="profile" />
    </Stack>
  );
};

export default ProfileStack;
