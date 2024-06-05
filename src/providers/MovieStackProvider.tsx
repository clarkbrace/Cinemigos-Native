import { DiscoverMovie } from "@/types";
import { createContext, PropsWithChildren, useContext, useRef, useState } from "react";
import { getTheMovieDBPage } from "@models/fetchMoviePage";
import { useUserMovieData } from "./UserMovieDataProvider";

type MovieStackData = {
  movieStack: Array<DiscoverMovie>; // Movies on swiping stack
  popMovieStack: () => DiscoverMovie | undefined;
  addMoviesToStack: () => void;
  // maybe change genre
};

export const MovieStackDataContext = createContext<MovieStackData>({
  movieStack: new Array<DiscoverMovie>(),
  popMovieStack: () => undefined,
  addMoviesToStack: () => {},
});

const MovieStackDataProvider = async ({ children }: PropsWithChildren) => {
  const userMovieData = useUserMovieData();

  const [movieStack, setMovieStack] = useState(new Array<DiscoverMovie>());
  // Update this to track all genres in the future
  const pageNumber = useRef<number>(0);

  const popMovieStack = () => {
    if (movieStack === undefined || movieStack.length === 0) {
      console.log(`[Movie Stack Provider] Movie stack empty/undefined: ${movieStack}.`);
      return undefined;
    }

    // Get last element
    const popedMovie = movieStack[movieStack.length - 1];

    // Remove list element
    setMovieStack(movieStack.slice(0, -1));
    return popedMovie;
  };

  const addMoviesToStack = async () => {
    // make call to API to get next page
    console.log(`[Movie Stack Provider] Making Call`);
    const moviePage = await getTheMovieDBPage(pageNumber.current);

    if (!moviePage.sucsess) {
      console.log(`[Movie Stack Provider] Call Failed`);
      return;
    }

    // filter by movies not seen by the user
    const unseenMovies = moviePage.discoverMovies?.filter((movie) => {
      userMovieData.hasUserSeenMovie(movie.id);
    });

    // Add movies to stack
    if (unseenMovies !== undefined) {
      setMovieStack([...unseenMovies, ...movieStack]);
    }
  };

  await addMoviesToStack();

  return (
    <MovieStackDataContext.Provider
      value={{
        movieStack,
        popMovieStack,
        addMoviesToStack,
      }}
    >
      {children}
    </MovieStackDataContext.Provider>
  );
};

export default MovieStackDataProvider;

export const useMovieStackDataProvider = () => useContext(MovieStackDataContext);
