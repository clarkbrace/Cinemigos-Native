import { View, Text, FlatList, Button } from "react-native";
import React from "react";
import { useUserMovieData } from "@providers/UserMovieDataProvider";
import { Movie } from "@/types";
import MovieListItem from "@components/MovieListItem";
import { dummy_movies } from "@assets/data/dummy_data";

const ProfileScreen = () => {
  const userMovieData = useUserMovieData();

  // REMOVE LATER
  const beeMovieObj: Movie = dummy_movies[0];
  const sawMovieObj: Movie = dummy_movies[1];

  const addBeeMovie = () => {
    userMovieData.addMovieToLiked(beeMovieObj);
  };
  const addSawMovie = () => {
    userMovieData.addMovieToLiked(sawMovieObj);
  };

  return (
    <View>
      <Text>Bee Movie Below</Text>
      <FlatList
        data={Array.from(userMovieData.likedMovies)}
        renderItem={({ item }) => <MovieListItem movie={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
      <Button onPress={addBeeMovie} title="Add Bee Movie" />
      <Button onPress={addSawMovie} title="Add Saw Movie" />
    </View>
  );
};

export default ProfileScreen;
