import { useState, useEffect, useContext } from "react";
import { useMovieCacheProvider } from "@providers/MovieCacheProvider";
import { useUserMovieData } from "@providers/UserMovieDataProvider";
import { getTheMovieDBMovieById } from "@models/loadMovie";
import { ApiResponse } from "@models/loadMovie";
import { Movie } from "@/types";

const useMovieManager = (movieId: number) => {
  const userMovieData = useUserMovieData();
  const movieCacheProvider = useMovieCacheProvider();

  // Load Movie Data
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (!userMovieData || !movieCacheProvider) {
    throw new Error(`useMovieManager must be used within both UserMovieProvider and MovieCacheProvider`);
  }

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Movie API Call handler
    const loadMovie = async () => {
      console.log(`[Use Movie] Loading movie id:  ${movieId}`);

      try {
        const movieReq: ApiResponse = await getTheMovieDBMovieById(movieId);
        if (movieReq.sucsess && movieReq.movie) {
          setMovie(movieReq.movie);
          
          // Update cache
          movieCacheProvider.addMovieToCache(movieReq.movie);
          
        } else {
          setError(`Movie with ID ${movieId} not found`);
          console.log(`[Use Movie] Error: Movie with ID ${movieId} not found`);
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

  // const getMovieById = async (movieId: number) => {
  // if (movieCacheProvider.isMovieInCache(movieId)) {
  //   return movieCacheProvider.getMovieFromCache(movieId);
  // }

  // Atempt to load movie if not present in cache
  // const movieCall: ApiResponse = await getTheMovieDBMovieById(movieId);
  // return movieCall;

  // // Update cache and return if movie sucsessfully loads
  // if (movieCall.sucsess && movieCall.movie) {
  //   movieCacheProvider.addMovieToCache(movieCall.movie);
  //   return movieCall.movie;
  // } else {
  //   console.error(`Failed to load movie ${movieId}: ${movieCall.error}`);
  // }
  // };

  return { loading, movie, error };
};

export default useMovieManager;
