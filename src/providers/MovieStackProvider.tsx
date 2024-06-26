import { DiscoverMovie, Movie } from "@/types";
import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getMoviePageByQueryParameters } from "@models/fetchMoviePage";
import { useUserMovieData } from "./UserMovieDataProvider";
import { useDiscoverMovieQueryParams } from "./DiscoverMovieQueryProvider";

export type MovieStackData = {
  movieStack: MutableRefObject<DiscoverMovie[]>; // Movies on swiping stack
  popMovieStack: () => DiscoverMovie | undefined;
  // addMoviesToStack: () => void;
  resetStack: () => void;
  printStack: () => void; // REMOVE
  // maybe change genre
};

export const MovieStackDataContext = createContext<MovieStackData | null>(null);

const MovieStackDataProvider = ({ children }: PropsWithChildren) => {
  // Providers
  const userMovieData = useUserMovieData();
  const discoverMovieQueryParams = useDiscoverMovieQueryParams();
  const movieStack = useRef(new Array<DiscoverMovie>());

  // Internal State
  // Update this to track all genres in the future
  const [pageNumber, setPageNumber] = useState(1);
  const [reRender, setRerender] = useState(false);
  const [morePagesAvailable, setMorePagesAvailable] = useState(true);
  const [updateMovieSelection, setUpdateMovieSelection] = useState(false);

  const popMovieStack = () => {
    if (movieStack === undefined || movieStack.current.length === 0) {
      console.log(
        `[Movie Stack Provider] Movie stack empty/undefined: ${movieStack}.`
      );
      return undefined;
    }

    // Get element to be popped
    const popedMovie = movieStack.current[0];

    // Remove list element
    movieStack.current = movieStack.current.slice(1, movieStack.current.length);

    console.log(
      `[Movie Stack Provider] Popping ${popedMovie.title} from stack`
    );

    setRerender(!reRender);
    return popedMovie;
  };

  const resetStack = () => {
    console.log(`[Stack Provider] Resetting Stack!`);
    movieStack.current = [];
    setPageNumber(1);
    setRerender(!reRender);
  };

  // REMOVE
  const printStack = () => {
    console.log(`[Print Current Stack]`);
    movieStack.current.forEach((movie) => console.log(movie.title));
  };

  useEffect(() => {
    const addMoviesToStack = async () => {
      // make call to API to get next page
      console.log(`[Movie Stack Provider] Making Call to page ${pageNumber}`);

      const moviePage = await getMoviePageByQueryParameters(
        discoverMovieQueryParams.getDiscoverQuery()
      );

      if (!moviePage.sucsess) {
        console.log(`[Movie Stack Provider] Call failed`);
        return;
      }

      // Ensure the MovieDB call sucseeded
      if (
        moviePage.discoverMovies === undefined ||
        moviePage.discoverMovies.total_results < 1
      ) {
        console.log(`[Movie Stack Provider] Failed to load page from movie db`);
        return;
      }

      // filter by movies not seen by the user
      let unseenMovies: DiscoverMovie[] =
        moviePage.discoverMovies.results.filter(
          (movie) =>
            !userMovieData.hasUserSeenMovie(movie.id) &&
            !movieStack.current.includes(movie)
        );

      console.log(
        `[Movie Stack Provider] adding movies to stack: \n ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`
      );
      unseenMovies.forEach((movie) => console.log(movie.title));
      console.log(`vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv`);

      // Add movies to stack
      if (unseenMovies !== undefined) {
        movieStack.current = [...movieStack.current, ...unseenMovies];
      }

      // Update current page count
      setPageNumber(pageNumber + 1);
    };

    if (movieStack.current.length < 10) {
      addMoviesToStack();
    }
  });

  return (
    <MovieStackDataContext.Provider
      value={{
        movieStack,
        popMovieStack,
        resetStack,
        printStack,
      }}
    >
      {children}
    </MovieStackDataContext.Provider>
  );
};

export default MovieStackDataProvider;

export const useMovieStackDataProvider = () => {
  const movieStackContext = useContext(MovieStackDataContext);

  if (!movieStackContext) {
    throw new Error(
      `useMovieStackDataProvider context must be used within Movie Stack Data Provider`
    );
  }

  return movieStackContext;
};
