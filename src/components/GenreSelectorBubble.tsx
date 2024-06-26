import { Genre } from "@/types";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface Props {
  genre: string;
  selected: boolean;
  toggle: () => void;
}

const GenreSelectorBubble = (props: Props) => {
  return (
    <Pressable onPress={props.toggle} style={styles.outerContainer}>
      <View
        style={[
          styles.bubble,
          { backgroundColor: props.selected ? "pink" : "lightblue" },
        ]}
      >
        <View style={[styles.container]}>
          <Text style={styles.genreText}>{props.genre.replace("_", " ")}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: 20,
  },
  container: {
    paddingHorizontal: 10,
  },
  genreText: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontFamily: "LexendDecaMedium",
    userSelect: "none",
  },
  bubble: {
    borderWidth: 1,
    borderRadius: 25,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default GenreSelectorBubble;
