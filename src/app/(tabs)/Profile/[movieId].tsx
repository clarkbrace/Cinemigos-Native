import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import useMovieManager from "@/src/hooks/useMovie";
import { useLocalSearchParams, Stack } from "expo-router";
import MovieBackdropOverlay from "@components/MovieBackdropOverlay";
import { minutesToHrMin, formatData } from "@/src/utility functions/TextFormatting";
import GenreTile from "@/src/components/GenreTile";
import Divider from "@components/Divider";
import DataAcknowledgment from "@components/DataAcknowledgment";

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

            <ScrollView horizontal={true} style={{ width: "100%", paddingVertical: 10, paddingEnd: 10 }}>
              {movie.genres.map((genre) => (
                <GenreTile id={genre.id} name={genre.name} key={genre.name} />
              ))}
            </ScrollView>
            <Divider />
            <DataAcknowledgment />
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
