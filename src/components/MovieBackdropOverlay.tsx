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
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/original${props.backdropPath}` }}
        resizeMode="cover"
        style={styles.imageContainer}
      >
        <View style={styles.imageInfoBackDrop}>
          <Text style={styles.title}>{props.movieTitle}</Text>
          <Text style={styles.tagline}>{props.movieTagline}</Text>
        </View>
      </ImageBackground>
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
    resizeMode: "contain",
    justifyContent: "flex-end",
  },
  imageInfoBackDrop: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 14,
    width: "100%",
  },
  title: {
    fontFamily: "LexendDecaBold",
    fontSize: 18,
    color: "white",
    paddingBottom: 5,
  },
  tagline: {
    fontFamily: "LexendDecaMedium",
    fontSize: 16,
    color: "lightgray",
  },
});

export default MovieBackdropOverlay;
