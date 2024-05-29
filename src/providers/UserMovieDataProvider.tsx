import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Movie } from "@/types";
import MovieCacheProvider from "./MovieCacheProvider";

// TODO: Add remove functions for Movies, ensure that they are safe even when removeing items that already exist
// TODO: Ensure movies can't be added twice, Look into if storing movies as sets would be feasable here.

// Type definition for the type of data being stored
type UserMovieDataType = {
  likedMovies: Set<number>;
  dislikedMovies: Set<number>;
  addMovieToLiked: (movie: number) => void;
  addMovieToDisliked: (movie: number) => void;
  removeMovieFromLiked: (movie: number) => void;
  removeMovieFromDisliked: (movie: number) => void;
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
  const [likedMovies, setLikedMovies] = useState(new Set<number>());

  // Stored disliked movie data
  const [dislikedMovies, setDisLikedMovies] = useState(new Set<number>());

  const addMovieToLiked = (movieId: number) => {
    // Ensure liked doesn't alreay have movie
    if (likedMovies.has(movieId)) {
      console.log(`[User Movie Data] Movie id: ${movieId} already present in liked movies`);
      return;
    }

    // Remove from disliked if present
    if (dislikedMovies.has(movieId)) {
      removeMovieFromDisliked(movieId);
      console.log(`[User Movie Data] Removing movie id: ${movieId} from disliked --v`);
    }

    const newSet = new Set(likedMovies);
    newSet.add(movieId);
    setLikedMovies(newSet);
    console.log(`[User Movie Data] Addded movie id: ${movieId} to liked movies`);

    // Update cache
  };

  const removeMovieFromLiked = (movieId: number) => {
    if (!likedMovies.has(movieId)) {
      console.log(`[User Movie Data] Movie id: ${movieId} was not present in liked movies on atempted removal`);
      return;
    }
    const newSet = new Set(likedMovies);
    newSet.delete(movieId);
    setLikedMovies(newSet);
    console.log(`[User Movie Data] Removed movie id: ${movieId} from liked`);
  };

  const addMovieToDisliked = (movieId: number) => {
    // Make sure disliked movies doesent alreay have movie
    if (dislikedMovies.has(movieId)) {
      console.log(`[User Movie Data] Movie id: ${movieId} is already present in disliked movies`);
      return;
    }

    // Make sure liked movies doesn't have movie
    if (likedMovies.has(movieId)) {
      console.log(`[User Movie Data] Removing movie id: ${movieId} from liked --v`);
      removeMovieFromLiked(movieId);
    }

    const newSet = new Set(dislikedMovies);
    newSet.add(movieId);
    setDisLikedMovies(newSet);
    console.log(`[User Movie Data] Adding movie id: ${movieId} to disliked movies`);
  };

  const removeMovieFromDisliked = (movieId: number) => {
    if (!dislikedMovies.has(movieId)) {
      console.log(`[User Movie Data] Movie id: ${movieId} was not present in disliked on atempted removal`);
      return;
    }
    const newSet = new Set(dislikedMovies);
    newSet.delete(movieId);
    setDisLikedMovies(newSet);
    console.log(`[User Movie Data] Movie id: ${movieId} was removed from disliked movies`);
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
