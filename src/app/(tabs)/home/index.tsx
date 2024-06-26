import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInputBase,
  Platform,
  Dimensions,
} from "react-native";
import SwipeableMovie from "@components/SwipeableMovie";
import { useMovieStackDataProvider } from "@providers/MovieStackProvider";
import GenreSelection from "@/src/components/GenreSelection";
import TestButton from "@/src/components/TestButton";

const STACK_RENDER_DEPTH = 3;

const HomeScreen = () => {
  const movieStackData = useMovieStackDataProvider();

  return (
    <View
      style={[
        styles.outer,
        {
          paddingHorizontal:
            Platform.OS === "web" ? Dimensions.get("window").width / 8 : 10,
        },
      ]}
    >
      <GenreSelection />
      <View style={styles.container}>
        {movieStackData.movieStack.current
          .slice(0, STACK_RENDER_DEPTH)
          .map((movieId, index) => (
            <SwipeableMovie
              movieId={movieId.id}
              key={movieId.id}
              style={[
                styles.moiveStack,
                { zIndex: STACK_RENDER_DEPTH - index },
              ]}
            />
          ))}
      </View>
      <TestButton
        title={"Reset Movie Stack"}
        onClick={movieStackData.printStack}
      />
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
