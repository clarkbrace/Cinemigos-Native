import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { Movie } from "@/types";

type MovieListItemProps = {
  movie: Movie;
};

const MovieListItem = ({ movie }: MovieListItemProps) => {
  return (
    // <Link href={`/profile/${movie.id}`}>
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w300/${movie.poster_path}` }}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>
    </View>
    // </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "33%",
    aspectRatio: 2 / 3,
  },
  image: {
    flex: 1,
    borderRadius: 25,
    resizeMode: "contain",
    overflow: "hidden",
    elevation: 10,
  },
});

export default MovieListItem;
