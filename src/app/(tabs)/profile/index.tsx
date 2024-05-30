import { View, Text, FlatList, Button, TextInput, StyleSheet, Platform } from "react-native";
import { useState } from "react";
import { useUserMovieData } from "@providers/UserMovieDataProvider";
import { useMovieCacheProvider } from "@/src/providers/MovieCacheProvider";
import { Movie } from "@/types";
import MovieListItem from "@components/MovieListItem";
import { dummy_movies } from "@assets/data/dummy_data";

const ProfileScreen = () => {
  const userMovieData = useUserMovieData();
  const [Idvalue, setIdValue] = useState(5559);
  // REMOVE LATER
  const addMovie = (movieId: number) => {
    userMovieData.addMovieToLiked(movieId);
  };
  const movieCache = useMovieCacheProvider();

  return (
    <View style={styles.container}>
      <Text>Movies:</Text>

      {/* <Button onPress={() => movieCache.printCache()} title="Cache contence" /> */}

      <FlatList
        data={Array.from(userMovieData.likedMovies)}
        renderItem={({ item }) => <MovieListItem movieId={item} />}
        numColumns={Platform.OS === "web" ? 3 : 3}
        contentContainerStyle={{ gap: 10, paddingHorizontal: Platform.OS === "web" ? 400 : 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />

      <Button onPress={() => addMovie(Idvalue)} title="Add Movie" />
      <TextInput
        numberOfLines={1}
        editable
        onChangeText={(text) => setIdValue(Number(text))}
        value={Idvalue.toString()}
      />
      {/* <Button onPress={addBeeMovie} title="Add Bee Movie" /> */}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
