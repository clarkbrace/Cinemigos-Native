import { StyleSheet, Dimensions, ViewStyle } from "react-native";
import React from "react";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  FadeOut,
  runOnJS,
} from "react-native-reanimated";
import MovieCard from "./MovieCard";
import { valueScaler } from "@utilities/ValueFunctions";
import { useUserMovieData } from "@providers/UserMovieDataProvider";
import { useMovieStackDataProvider } from "../providers/MovieStackProvider";

interface Props {
  movieId: number;
  style?: ViewStyle | ViewStyle[];
}

const SwipeableMovie = (props: Props) => {
  const userMovieData = useUserMovieData();
  const movieStackProvider = useMovieStackDataProvider();

  const pressed = useSharedValue<boolean>(false);
  const offset = useSharedValue<number>(0);
  const screenWidth = Dimensions.get("screen").width;

  function rotationAmount(offsetValue: number) {}
  // const { movie, loading, error } = useMovieManager(movieId);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offset.value = event.translationX;
    })
    .onFinalize(() => {
      let movieSwiped = false;
      if (offset.value > screenWidth / 4) {
        console.log(`[Swipeable Movie] Swiped Right (like) on ${props.movieId}`);
        runOnJS(userMovieData.addMovieToLiked)(props.movieId);
        runOnJS(movieStackProvider.popMovieStack)();
        movieSwiped = true;
      } else if (offset.value < -screenWidth / 4) {
        console.log(`[Swipeable Movie] Swiped Left (dislike) on ${props.movieId}`);
        runOnJS(userMovieData.addMovieToDisliked)(props.movieId);
        runOnJS(movieStackProvider.popMovieStack)();
        movieSwiped = true;
      }

      offset.value = withSpring(0, {
        mass: 1,
        damping: 20,
        stiffness: 100,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
      });

      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      offset.value,
      [-screenWidth, 0, screenWidth / 2], // Range of the input value
      ["rgba(255,0,0,1)", "rgba(0,0,255,1)", "rgba(0,255,0,1)"] // Colors: blue to clear to red
    ),
    transform: [{ translateX: offset.value }, { rotateZ: `${offset.value / 20}deg` }],
  }));

  return (
    <GestureHandlerRootView style={[styles.container, props.style]}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.movie, animatedStyles]}>
          <MovieCard movieId={props.movieId} />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default SwipeableMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  movie: {
    // width: Dimensions.get("window").width * 0.9,
    // maxHeight: Dimensions.get("screen").height,
    flex: 1,
    aspectRatio: 2 / 3,
    borderWidth: 8,
    borderRadius: 25,
    overflow: "hidden",
  },
});
