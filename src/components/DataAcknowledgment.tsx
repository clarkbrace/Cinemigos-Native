import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
// import Logo from "@assets/images/TMDB.svg";

const DataAcknowledgment = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Movie data provided by</Text>
      <View style={styles.imageContainer}>
        {/* <Logo style={styles.images} /> */}
        <Image source={require("@assets/images/JustWatch-icon.png")} style={styles.images} />
      </View>
    </View>
  );
};

export default DataAcknowledgment;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 5,
  },
  text: {
    fontFamily: "LexendDecaMedium",
    color: "gray",
    fontSize: 14,
  },
  imageContainer: {
    alignContent: "space-between",
    flexDirection: "row",
    flex: 1,
  },
  images: {
    width: 150,
    resizeMode: "contain",
  },
});
