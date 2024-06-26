import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Button,
  Image,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { Movie } from "@/types";
import { MovieResponse, getTheMovieDBMovieById } from "@/src/models/fetchMovie"; // Adjust path as necessary
import useMovieManager from "@hooks/useMovie";
import { Link } from "expo-router";

type MovieListItemProps = {
  movieId: number;
};

const MovieListItem = ({ movieId }: MovieListItemProps) => {
  const { movie, loading, error } = useMovieManager(movieId);

  return (
    <Link href={`/Profile/${movieId}`} asChild>
      <Pressable style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text> Error Loading Movie </Text>
        ) : (
          movie !== undefined && (
            <ImageBackground
              source={{
                uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
              }}
              resizeMode="cover"
              style={styles.image}
            />
          )
        )}
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 2 / 3,
    borderRadius: 25,
    backgroundColor: "lightgray",
    justifyContent: "center",
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
