import { Movie } from "@/types";
import { createContext, PropsWithChildren, useContext, useRef } from "react";

// TODO: Change cache dMovieIds to Double LinkedList + add current index to movie cache along with movie for extra speed

const CACHE_SIZE = 256;

type MovieCacheFunctions = {
  addMovieToCache: (movie: Movie) => void;
  isMovieInCache: (movieId: number) => boolean;
  getMovieFromCache: (movieId: number) => Movie | undefined;
  printCache: () => void;
};

// Default return values
export const MovieCacheContext = createContext<MovieCacheFunctions>({
  addMovieToCache: (movie: Movie) => {},
  isMovieInCache: (movieId: number) => false,
  getMovieFromCache: (movieId: number) => undefined,
  printCache: () => {},
});

const MovieCacheProvider = ({ children }: PropsWithChildren) => {
  const cachedMovieIds = useRef<number[]>([]);
  const movieCache = useRef(new Map<number, Movie>());

  const addMovieToCache = (movie: Movie) => {
    // Check to see if movie is already in cache
    if (isMovieInCache(movie.id)) {
      console.log(`[Movie Cache] Movie ${movie.id} already in cache`);
      return;
    }

    // Remove last movie from cache if cache is filled
    if (cachedMovieIds.current.length >= CACHE_SIZE) {
      const leastCalledMovieId = cachedMovieIds.current.pop();
      // Remove movie from cache
      if (leastCalledMovieId) {
        console.log(`[Movie Cache] Removing ${movieCache.current.get(leastCalledMovieId)?.title} from cache`);
        movieCache.current.delete(leastCalledMovieId);
      }
    }

    // Add movie to cache
    movieCache.current.set(movie.id, movie);
    cachedMovieIds.current = [movie.id, ...cachedMovieIds.current];

    console.log(`[Movie Cache] Added movie ${movie.title} to cache`);
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
    // Updating Caching not multi-thread safe!!!!
    // cachedMovieIds.current = cachedMovieIds.current.filter((movieId) => movieId !== movieId);
    // cachedMovieIds.current = [movieId, ...cachedMovieIds.current];

    console.log(`[Movie Cache] Returning moive ${movieCache.current.get(movieId)?.title} from cache`);
    return movieCache.current.get(movieId);
  };

  const printCache = () => {
    const movieTitles: string[] = [];
    movieCache.current.forEach((movie) => {
      movieTitles.push(movie.title);
    });

    console.log(`[Movie Cache] Cache contence: ${Array.from(cachedMovieIds.current)}, Cache Movies: ${movieTitles}`);
  };

  return (
    <MovieCacheContext.Provider
      value={{
        addMovieToCache,
        isMovieInCache,
        getMovieFromCache,
        printCache,
      }}
    >
      {children}
    </MovieCacheContext.Provider>
  );
};

export default MovieCacheProvider;

export const useMovieCacheProvider = () => useContext(MovieCacheContext);
