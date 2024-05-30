import { View, Text, ScrollView, Image, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import React from "react";
import useMovieManager from "@/src/hooks/useMovie";
import { useLocalSearchParams, Stack } from "expo-router";
import MovieBackdropOverlay from "@components/MovieBackdropOverlay";

const MovieDetailScreen = () => {
  const { movieId } = useLocalSearchParams();
  const { movie, loading, error } = useMovieManager(Number(movieId));

  return (
    <ScrollView>
      <Stack.Screen options={{ title: `${movie?.title}` }} />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text> Error Loading Movie </Text>
      ) : (
        movie !== undefined && (
          <MovieBackdropOverlay
            backdropPath={movie.backdrop_path}
            movieTitle={movie.title}
            movieTagline={movie.tagline}
          />
        )
      )}
    </ScrollView>
  );
};

export default MovieDetailScreen;
