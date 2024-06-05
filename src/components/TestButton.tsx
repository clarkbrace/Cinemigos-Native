import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

interface Props {
  title: string;
  onClick: () => void;
}

const TextButton = (props: Props) => {
  return (
    <Pressable onPress={props.onClick} style={styles.container}>
      <Text>{props.title}</Text>
    </Pressable>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    height: 30,
    width: 100,
  },
});
