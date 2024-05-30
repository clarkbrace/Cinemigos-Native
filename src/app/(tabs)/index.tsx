import { Button, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "@components/EditScreenInfo";
import { Text, View } from "@components/Themed";
import { Redirect } from "expo-router";

export default function TabOneScreen() {
  return <Redirect href={"/(tabs)"} />;
}
