import { useState, useEffect, useContext } from "react";
import { useMovieCacheProvider } from "@providers/MovieCacheProvider";
import { useUserMovieData } from "@providers/UserMovieDataProvider";
import { getTheMovieDBMovieById } from "@/src/models/fetchMovie";
import { MovieResponse } from "@/src/models/fetchMovie";
import { Movie } from "@/types";

const useMovieManager = (movieId: number) => {
  const userMovieData = useUserMovieData();
  const movieCacheProvider = useMovieCacheProvider();

  if (!userMovieData || !movieCacheProvider) {
    throw new Error(
      `useMovieManager must be used within both UserMovieProvider and MovieCacheProvider`
    );
  }

  // Load Movie Data
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Movie API Call handler
    const loadMovie = async () => {
      console.log(`[Use Movie] Loading movie id:  ${movieId}`);

      try {
        const movieResponce: MovieResponse = await getTheMovieDBMovieById(
          movieId
        );
        if (movieResponce.sucsess && movieResponce.movie) {
          setMovie(movieResponce.movie);

          // Update cache
          movieCacheProvider.addMovieToCache(movieResponce.movie);
        } else {
          setError(
            `Movie with ID ${movieId} was loaded but no movie was found`
          );
          console.log(
            `[Use Movie] Error: Movie with ID ${movieId} was loaded but no movie was found`
          );
        }
      } catch (error) {
        setError(`[Use Movie]  Failed to fetch movie: ${error}`);
        console.error(`[Use Movie] Failed to fetch movie: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    if (movieCacheProvider.isMovieInCache(movieId)) {
      console.log(`[Use Movie] Movie id: ${movieId} in Cache `);
      setMovie(movieCacheProvider.getMovieFromCache(movieId));
      setLoading(false);
    } else {
      loadMovie(); // Here need to return value
    }
  }, [movieId]);

  return { loading, movie, error };
};

export default useMovieManager;
