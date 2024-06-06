import { View, Text, StyleSheet, Button, TextInputBase } from "react-native";

import SwipeableMovie from "@components/SwipeableMovie";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MovieCard from "@components/MovieCard";
import { useMovieStackDataProvider } from "@providers/MovieStackProvider";
import TestButton from "@/src/components/TestButton";

const STACK_RENDER_DEPTH = 3;

const HomeScreen = () => {
  const movieStackData = useMovieStackDataProvider();

  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        {movieStackData.movieStack.slice(0, STACK_RENDER_DEPTH).map((movieId, index) => (
          <SwipeableMovie
            movieId={movieId.id}
            key={movieId.id}
            style={[styles.moiveStack, { zIndex: STACK_RENDER_DEPTH - index }]}
          />
        ))}
      </View>
      {/* <TestButton onClick={() => movieStackData.printStack()} title="Print Stack" /> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  moiveStack: {
    position: "absolute",
    width: "100%",
    height: "90%",
  },
});
