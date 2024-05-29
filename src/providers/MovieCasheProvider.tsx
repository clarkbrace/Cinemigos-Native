import { Movie } from "@/types";
import { createContext, PropsWithChildren, useContext, useRef } from "react";

// TODO: Change cashedMovieIds to Double LinkedList + add current index to movie cashe along with movie for extra speed

const CASHE_SIZE = 20;

// type MovieCasheType = {
//   cashedMovieIds: number[];
//   movieCashe: Map<number, Movie>;
//   casheMovie: () => void;
// };

type MovieCasheFunctions = {
  addMovieToCashe: (movie: Movie) => void;
  isMovieInCashe: (movieId: number) => boolean;
  getMovieFromCashe: (movieId: number) => Movie | undefined;
};

// Default return values
export const MovieCasheContext = createContext<MovieCasheFunctions>({
  // cashedMovieIds: [],
  // movieCashe: new Map<number, Movie>(),
  addMovieToCashe: (movie: Movie) => {},
  isMovieInCashe: (movieId: number) => false,
  getMovieFromCashe: (movieId: number) => undefined,
});

const MovieCasheProvider = ({ children }: PropsWithChildren) => {
  const cashedMovieIds = useRef<number[]>([]);
  const movieCashe = useRef(new Map<number, Movie>());

  const addMovieToCashe = (movie: Movie) => {
    // Check to see if cashe is full
    if (cashedMovieIds.current.length >= CASHE_SIZE) {
      const leastCalledMovie = cashedMovieIds.current[-1];

      // Remove movie from cashe
      movieCashe.current.delete(leastCalledMovie);
      cashedMovieIds.current.pop();
    }

    // Add movie to cashe
    movieCashe.current.set(movie.id, movie);
    cashedMovieIds.current.unshift(movie.id);
  };

  const isMovieInCashe = (movieId: number) => {
    return movieCashe.current.has(movieId);
  };

  // I kinda hate this implemntaion. Wreaks the runtime bonus from using map + array
  const getMovieFromCashe = (movieId: number) => {
    if (!movieCashe.current.has(movieId)) {
      return undefined;
    }

    // Add movie id to top of cashedMovieIds
    cashedMovieIds.current = cashedMovieIds.current.filter(
      (movieId) => movieId !== movieId
    );
    cashedMovieIds.current.unshift(movieId);

    return movieCashe.current.get(movieId);
  };

  return (
    <MovieCasheContext.Provider
      value={{ addMovieToCashe, isMovieInCashe, getMovieFromCashe }}
    >
      {children}
    </MovieCasheContext.Provider>
  );
};

export default MovieCasheProvider;

export const useMovieCasheProvider = () => useContext(MovieCasheContext);
