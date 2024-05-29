import { View, Text, StyleSheet, ImageBackground, ActivityIndicator, Button, Image } from "react-native";
import { useEffect, useState } from "react";
import { Movie } from "@/types";
import { getMovieById } from "@services/movieServices"; // Adjust path as necessary
import { ApiResponse, getTheMovieDBMovieById } from "../models/loadMovie"; // Adjust path as necessary

type MovieListItemProps = {
  movieId: number;
};

const MovieListItem = ({ movieId }: MovieListItemProps) => {
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovie = async () => {
      console.log("useEffect: loadMovie function called ");
      setLoading(true);
      setError(null);

      console.log(`Loading movie id:  ${movieId}`);

      try {
        const movieReq: ApiResponse = await getTheMovieDBMovieById(movieId);
        if (movieReq.sucsess) {
          const mv: Movie | undefined = movieReq.movie;
          setMovie(mv);
          console.log("Movie sucsessfully set");
        } else {
          setError(`Movie with ID ${movieId} not found`);
          console.log(`Error: Movie with ID ${movieId} not found`);
        }
      } catch (error) {
        setError(`Failed to fetch movie: ${error}`);
        console.error(`Failed to fetch movie: ${error}`);
      } finally {
        setLoading(false);
        console.log("Loading state set to false");
      }
    };
    loadMovie();
  }, []);

  // console.log("Rendering component:", { loading, error, movie });

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text> Error Loading Movie </Text>
      ) : (
        movie !== undefined && (
          <ImageBackground
            source={{ uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }}
            resizeMode="cover"
            style={styles.image}
          />
        )
      )}

      {/* <Button
            onPress={() => console.log("Poster path", `https://image.tmdb.org/t/p/w300${movie.poster_path}`)}
            title="Print Movie"
          /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "33%",
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
