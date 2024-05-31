import { View, Text, StyleSheet } from "react-native";
import { Genre } from "@/types";
import React from "react";

const GenreTile = (genre: Genre) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.genreText}>{genre.name}</Text>
      </View>
    </View>
  );
};

export default GenreTile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  genreText: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontFamily: "LexendDecaMedium",
  },
  bubble: {
    borderWidth: 1,
    borderRadius: 25,
    alignContent: "center",
    justifyContent: "center",
  },
});
