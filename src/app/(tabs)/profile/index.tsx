import { View, Text, FlatList, Button } from "react-native";
import React from "react";
import { useUserMovieData } from "@providers/UserMovieDataProvider";
import { Movie } from "@/types";
import MovieListItem from "@components/MovieListItem";
import { dummy_movies } from "@assets/data/dummy_data";

const ProfileScreen = () => {
  const userMovieData = useUserMovieData();

  // REMOVE LATER

  const addBeeMovie = () => {
    userMovieData.addMovieToLiked(5559);
    userMovieData.addMovieToLiked(5552);
  };

  return (
    <View>
      <Text>Movies:</Text>
      <FlatList
        data={Array.from(userMovieData.likedMovies)}
        renderItem={({ item }) => <MovieListItem movieId={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
      <Button onPress={addBeeMovie} title="Add Bee Movie" />
      <Button onPress={() => console.log(Array.from(userMovieData.likedMovies))} title="liked movies" />
    </View>
  );
};

export default ProfileScreen;
