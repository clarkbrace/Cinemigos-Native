import { View, Text, FlatList, Button, TextInput, StyleSheet, Platform, Dimensions, Pressable } from "react-native";
import { useState } from "react";
import { useUserMovieData } from "@providers/UserMovieDataProvider";
import { useMovieCacheProvider } from "@/src/providers/MovieCacheProvider";
import MovieListItem from "@components/MovieListItem";

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
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: Platform.OS === "web" ? Dimensions.get("window").width / 8 : 10,
        }}
        columnWrapperStyle={{ gap: 10 }}
      />

      <Pressable onPress={() => addMovie(Idvalue)} style={styles.button} />
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
  button: {
    width: "100%",
    height: 30,
    flex: 1,
    backgroundColor: "blue",
  },
});
