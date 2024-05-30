import { View, Text, Dimensions, StyleSheet, ImageBackground } from "react-native";
import React from "react";

interface Props {
  backdropPath: string;
  movieTitle: string;
  movieTagline: string;
}

const MovieBackdropOverlay = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "column", alignItems: "baseline" }}>
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/original${props.backdropPath}` }}
          resizeMode="cover"
          style={styles.imageContainer}
        >
          <Text>{props.movieTitle}</Text>
          <Text>{props.movieTagline}</Text>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: Dimensions.get("window").height / 3,
  },
  imageContainer: {
    flex: 1,
    width: "auto",
    aspectRatio: 2 / 1,
    resizeMode: "contain",
  },
  imageInfoBackDrop: {
    flex: 1,
    alignItems: "flex-start",
  },
});

export default MovieBackdropOverlay;
