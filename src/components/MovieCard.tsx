import { View, Text, StyleSheet, ActivityIndicator, ImageBackground } from "react-native";
import React from "react";
import useMovieManager from "@hooks/useMovie";

interface Props {
  movieId: number;
}

const MovieCard = (props: Props) => {
  const { movie, loading, error } = useMovieManager(props.movieId);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text> Error Loading Movie </Text>
      ) : (
        movie !== undefined && (
          <ImageBackground
            source={{ uri: `https://image.tmdb.org/t/p/original${movie.poster_path}` }}
            resizeMode="cover"
            style={styles.image}
          />
        )
      )}
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    overflow: "hidden",
  },
});
