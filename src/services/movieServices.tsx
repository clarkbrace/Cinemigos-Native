import { useMovieCacheProvider } from "@/src/providers/MovieCacheProvider";
import { ApiResponse, getTheMovieDBMovieById } from "@models/loadMovie";
import { Movie } from "@/types";

export async function getMovieById(movieId: number): Promise<Movie | undefined> {
  console.log("Here");
  const movieCacheProvider = useMovieCacheProvider();
  console.log("Here2");
  // Check to see if movie is in cache
  if (movieCacheProvider.isMovieInCache(movieId)) {
    return movieCacheProvider.getMovieFromCache(movieId);
  }

  // Atempt to load movie if not present in cache
  const movieCall: ApiResponse = await getTheMovieDBMovieById(movieId);

  // Update cache and return if movie sucsessfully loads
  if (movieCall.sucsess && movieCall.movie) {
    movieCacheProvider.addMovieToCache(movieCall.movie);
    return movieCall.movie;
  } else {
    console.error(`Failed to load movie ${movieId}: ${movieCall.error}`);
  }
}
