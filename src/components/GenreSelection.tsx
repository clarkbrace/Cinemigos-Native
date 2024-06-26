import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useGenreSelction } from "@providers/GenreSelectionProvider";
import GenreSelectorBubble from "@components/GenreSelectorBubble";
import { MovieGenres } from "@/types";

const GenreSelection = () => {
  const { getGenreSelection, changeGenreSelection } = useGenreSelction();
  const genreSelection = getGenreSelection();

  return (
    <View>
      <ScrollView horizontal={true} style={sytles.scrollView}>
        {Object.entries(genreSelection).map(([genre, selected]) => (
          <GenreSelectorBubble
            key={genre}
            genre={genre}
            selected={selected}
            toggle={() =>
              changeGenreSelection(
                MovieGenres[genre as keyof typeof MovieGenres],
                !selected
              )
            }
          />
        ))}
      </ScrollView>
    </View>
  );
};

const sytles = StyleSheet.create({
  scrollView: {
    paddingTop: 10,
    paddingBottom: 20,
  },
});

export default GenreSelection;
