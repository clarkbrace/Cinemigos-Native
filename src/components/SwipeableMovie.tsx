import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const SwipeableMovie = () => {
  const pressed = useSharedValue<boolean>(false);
  const offset = useSharedValue<number>(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offset.value = event.translationX;
    })
    .onFinalize(() => {
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
    transform: [{ translateX: offset.value }, { rotateZ: `${offset.value / 20}deg` }],
  }));

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.movie, animatedStyles]} />
        </GestureDetector>
      </View>
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
    width: Dimensions.get("window").width * 0.8,
    aspectRatio: 2 / 3,
    backgroundColor: "red",
  },
});
