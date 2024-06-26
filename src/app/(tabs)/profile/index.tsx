import { View, FlatList, StyleSheet, Platform, Dimensions } from "react-native";
import { useUserMovieData } from "@providers/UserMovieDataProvider";
import MovieListItem from "@components/MovieListItem";

const ProfileScreen = () => {
  const userMovieData = useUserMovieData();
  
  return (
    <View style={styles.container}>
      <FlatList
        data={Array.from(userMovieData.likedMovies)}
        renderItem={({ item }) => <MovieListItem movieId={item} />}
        numColumns={Platform.OS === "web" ? 3 : 3}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal:
            Platform.OS === "web" ? Dimensions.get("window").width / 8 : 10,
        }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  button: {
    width: "100%",
    height: 30,
    flex: 1,
    backgroundColor: "blue",
  },
});
