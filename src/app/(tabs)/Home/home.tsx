import { View, Text, StyleSheet, Button } from "react-native";

import SwipeableMovie from "@components/SwipeableMovie";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MovieCard from "@components/MovieCard";
import { useMovieStackDataProvider } from "@providers/MovieStackProvider";
import TextButton from "@/src/components/TestButton";

const moiveList = [5559, 671]; // , 671, 157336, 593643, 105, 165, 196, 1236345

const HomeScreen = () => {
  const movieStackData = useMovieStackDataProvider();

  return (
    <View style={styles.container}>
      {movieStackData.movieStack.map((movieId, index) => (
        <SwipeableMovie
          movieId={movieId.id}
          key={movieId.id}
          style={[styles.moiveStack, { zIndex: moiveList.length - index }]}
        />
      ))}
      <TextButton onClick={() => console.log("here")} title="Add movies to stack" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  moiveStack: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
