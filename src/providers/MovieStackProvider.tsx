import { DiscoverMovie } from "@/types";
import { createContext, PropsWithChildren, useContext, useRef, useState } from "react";
import { getTheMovieDBPage } from "@models/fetchMoviePage";
import { useUserMovieData } from "./UserMovieDataProvider";

type MovieStackData = {
  movieStack: Array<DiscoverMovie>; // Movies on swiping stack
  popMovieStack: () => DiscoverMovie | undefined;
  addMoviesToStack: () => void;
  printStack: () => void; // REMOVE
  // maybe change genre
};

export const MovieStackDataContext = createContext<MovieStackData>({
  movieStack: new Array<DiscoverMovie>(),
  popMovieStack: () => undefined,
  addMoviesToStack: () => {},
  printStack: () => {},
});

const MovieStackDataProvider = ({ children }: PropsWithChildren) => {
  const userMovieData = useUserMovieData();

  const [movieStack, setMovieStack] = useState(new Array<DiscoverMovie>());
  // Update this to track all genres in the future
  const [pageNumber, setPageNumber] = useState(1);

  const popMovieStack = () => {
    if (movieStack === undefined || movieStack.length === 0) {
      console.log(`[Movie Stack Provider] Movie stack empty/undefined: ${movieStack}.`);
      return undefined;
    }

    // Get last element
    const popedMovie = movieStack[movieStack.length - 1];

    // Remove list element
    setMovieStack(movieStack.slice(1, movieStack.length));

    console.log(`[Movie Stack Provider] Popping ${popedMovie.title} from stack`);

    return popedMovie;
  };

  const addMoviesToStack = async () => {
    // make call to API to get next page
    console.log(`[Movie Stack Provider] Making Call`);
    const moviePage = await getTheMovieDBPage(pageNumber);

    if (!moviePage.sucsess) {
      console.log(`[Movie Stack Provider] Call Failed`);
      return;
    }

    console.log(`[Movie Stack Provider] Movies from page ${pageNumber}`);
    moviePage.discoverMovies?.forEach((movie) => console.log(`[Movie Stack Provider] Movies from page ${movie.title}`));

    // filter by movies not seen by the user
    let unseenMovies = moviePage.discoverMovies?.filter((movie) => !userMovieData.hasUserSeenMovie(movie.id));

    // filter by movies already in the stack
    unseenMovies = unseenMovies?.filter((movie) => !movieStack.includes(movie));

    // Add movies to stack
    if (unseenMovies !== undefined) {
      setMovieStack([...movieStack, ...unseenMovies]);
    }

    setPageNumber(pageNumber + 1);
    console.log(`[Movie Stack Provider] ${pageNumber}`);
  };

  const printStack = () => {
    console.log(`[Print Current Stack]`);
    movieStack.forEach((movie) => console.log(movie.title));
  };

  // Inital Load of movies
  if (movieStack.length < 10) {
    addMoviesToStack();
  }

  return (
    <MovieStackDataContext.Provider
      value={{
        movieStack,
        popMovieStack,
        addMoviesToStack,
        printStack,
      }}
    >
      {children}
    </MovieStackDataContext.Provider>
  );
};

export default MovieStackDataProvider;

export const useMovieStackDataProvider = () => useContext(MovieStackDataContext);
