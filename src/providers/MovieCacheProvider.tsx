import { Movie } from "@/types";
import { createContext, PropsWithChildren, useContext, useRef } from "react";

// TODO: Change cache dMovieIds to Double LinkedList + add current index to movie cache along with movie for extra speed

const CACHE_SIZE = 20;

// type MovieCacheType = {
//   cachedMovieIds: number[];
//   movieCache: Map<number, Movie>;
//   cacheMovie: () => void;
// };

type MovieCacheFunctions = {
  addMovieToCache: (movie: Movie) => void;
  isMovieInCache: (movieId: number) => boolean;
  getMovieFromCache: (movieId: number) => Movie | undefined;
};

// Default return values
export const MovieCacheContext = createContext<MovieCacheFunctions>({
  // cachedMovieIds: [],
  // movieCache: new Map<number, Movie>(),
  addMovieToCache: (movie: Movie) => {},
  isMovieInCache: (movieId: number) => false,
  getMovieFromCache: (movieId: number) => undefined,
});

const MovieCacheProvider = ({ children }: PropsWithChildren) => {
  const cachedMovieIds = useRef<number[]>([]);
  const movieCache = useRef(new Map<number, Movie>());

  const addMovieToCache = (movie: Movie) => {
    // Check to see if cache is full
    if (cachedMovieIds.current.length >= CACHE_SIZE) {
      const leastCalledMovie = cachedMovieIds.current[-1];

      // Remove movie from cache
      movieCache.current.delete(leastCalledMovie);
      cachedMovieIds.current.pop();
    }

    // Add movie to cache
    movieCache.current.set(movie.id, movie);
    cachedMovieIds.current.unshift(movie.id);
  };

  const isMovieInCache = (movieId: number) => {
    return movieCache.current.has(movieId);
  };

  // I kinda hate this implemntaion. Wreaks the runtime bonus from using map + array
  const getMovieFromCache = (movieId: number) => {
    if (!movieCache.current.has(movieId)) {
      return undefined;
    }

    // Add movie id to top of cachedMovieIds
    cachedMovieIds.current = cachedMovieIds.current.filter((movieId) => movieId !== movieId);
    cachedMovieIds.current.unshift(movieId);

    return movieCache.current.get(movieId);
  };

  return (
    <MovieCacheContext.Provider
      value={{ addMovieToCache: addMovieToCache, isMovieInCache: isMovieInCache, getMovieFromCache: getMovieFromCache }}
    >
      {children}
    </MovieCacheContext.Provider>
  );
};

export default MovieCacheProvider;

export const useMovieCacheProvider = () => useContext(MovieCacheContext);
