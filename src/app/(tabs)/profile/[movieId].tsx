import { View, Text, ScrollView, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import useMovieManager from "@/src/hooks/useMovie";
import { useLocalSearchParams, Stack } from "expo-router";
import MovieBackdropOverlay from "@components/MovieBackdropOverlay";
import { minutesToHrMin, formatData } from "@/src/utility functions/TextFormatting";
import GenreTile from "@/src/components/GenreTile";

const MovieDetailScreen = () => {
  const { movieId } = useLocalSearchParams();
  const { movie, loading, error } = useMovieManager(Number(movieId));

  return (
    <View>
      <Stack.Screen options={{ title: `${movie?.title}` }} />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text> Error Loading Movie </Text>
      ) : (
        movie !== undefined && (
          // Movie Content
          <ScrollView>
            <MovieBackdropOverlay
              backdropPath={movie.backdrop_path}
              movieTitle={movie.title}
              movieTagline={movie.tagline}
            />
            <View style={styles.movieDetails}>
              <Text style={styles.movieDetailsText}>{minutesToHrMin(movie.runtime)}</Text>
              <Text style={styles.movieDetailsText}>{formatData(movie.release_date)}</Text>
            </View>
            <Text style={styles.overview}>{movie.overview}</Text>

            <FlatList
              horizontal={true}
              data={movie.genres}
              renderItem={({ item }) => <GenreTile id={item.id} name={item.name} />}
              contentContainerStyle={styles.contentContainerStyle}
            />
          </ScrollView>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  movieDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
  },
  movieDetailsText: {
    fontFamily: "LexendDecaMedium",
    color: "gray",
  },
  overview: {
    fontFamily: "LexendDecaMedium",
    color: "black",
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 16,
  },
  contentContainerStyle: {
    justifyContent: "space-evenly", // Distribute items evenly
    paddingHorizontal: 10, // Add padding if needed
    width: "100%",
    padding: 5,
  },
});

export default MovieDetailScreen;
