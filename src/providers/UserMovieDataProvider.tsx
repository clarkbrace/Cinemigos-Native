import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Movie } from "@/types";
import MovieCashe from "./MovieCasheProvider";

// TODO: Add remove functions for Movies, ensure that they are safe even when removeing items that already exist
// TODO: Ensure movies can't be added twice, Look into if storing movies as sets would be feasable here.

// Type definition for the type of data being stored
type UserMovieDataType = {
  likedMovies: Set<Movie>;
  dislikedMovies: Set<Movie>;
  addMovieToLiked: (movie: Movie) => void;
  addMovieToDisliked: (movie: Movie) => void;
  removeMovieFromLiked: (movie: Movie) => void;
  removeMovieFromDisliked: (movie: Movie) => void;
};

// Create UserMovieDataContext with Default context values
export const UserMovieDataContext = createContext<UserMovieDataType>({
  likedMovies: new Set(),
  dislikedMovies: new Set(),
  addMovieToLiked: () => {},
  addMovieToDisliked: () => {},
  removeMovieFromLiked: () => {},
  removeMovieFromDisliked: () => {},
});

// Wrapper component that allows access to stored movie data
const UserMovieDataProvider = ({ children }: PropsWithChildren) => {
  // Stored liked movie data
  const [likedMovies, setLikedMovies] = useState(new Set<Movie>());

  // Stored disliked movie data
  const [dislikedMovies, setDisLikedMovies] = useState(new Set<Movie>());

  const addMovieToLiked = (movie: Movie) => {
    // Ensure liked doesn't alreay have movie
    if (likedMovies.has(movie)) {
      console.log("Movie already present");
      return;
    }

    // Remove from disliked if present
    if (dislikedMovies.has(movie)) {
      removeMovieFromDisliked(movie);
    }

    const newSet = new Set(likedMovies);
    newSet.add(movie);
    setLikedMovies(newSet);
    console.log("addded movie");

    // Update cashe
  };

  const removeMovieFromLiked = (movie: Movie) => {
    if (!likedMovies.has(movie)) {
      console.log("Movie was not present liked");
      return;
    }
    const newSet = new Set(likedMovies);
    newSet.delete(movie);
    setLikedMovies(newSet);
    console.log("removed movie from liked");
  };

  const addMovieToDisliked = (movie: Movie) => {
    // Make sure disliked movies doesent alreay have movie
    if (dislikedMovies.has(movie)) {
      console.log(`Disliked movie already has ${movie.title}`);
      return;
    }

    // Make sure liked movies doesn't have movie
    if (likedMovies.has(movie)) {
      console.log(`Removing ${movie.title} from liked. Adding to disliked`);
      removeMovieFromLiked(movie);
    }

    const newSet = new Set(dislikedMovies);
    newSet.add(movie);
    setDisLikedMovies(newSet);
  };

  const removeMovieFromDisliked = (movie: Movie) => {
    if (!dislikedMovies.has(movie)) {
      console.log("Movie was not present disliked");
      return;
    }
    const newSet = new Set(dislikedMovies);
    newSet.delete(movie);
    setDisLikedMovies(newSet);
    console.log("removed movie from disliked");
  };

  // Create context provider to be wrapped around components that need access to User Movie Data
  return (
    <UserMovieDataContext.Provider
      value={{
        likedMovies,
        dislikedMovies,
        addMovieToLiked,
        addMovieToDisliked,
        removeMovieFromLiked,
        removeMovieFromDisliked,
      }}
    >
      {children}
    </UserMovieDataContext.Provider>
  );
};

export default UserMovieDataProvider;

// Export useUserMovieData as an easyier means to access User Movie Data Context as a consumer component
export const useUserMovieData = () => useContext(UserMovieDataContext);
