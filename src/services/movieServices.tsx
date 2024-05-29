import { useMovieCasheProvider } from "@providers/MovieCasheProvider";
import { ApiResponse, getTheMovieDBMovieById } from "@models/loadMovie";
import { Movie } from "@/types";

export async function getMovieById(movieId: number): Promise<Movie | undefined> {
  console.log("Here");
  const movieCasheProvider = useMovieCasheProvider();
  console.log("Here2");
  // Check to see if movie is in cashe
  if (movieCasheProvider.isMovieInCashe(movieId)) {
    return movieCasheProvider.getMovieFromCashe(movieId);
  }

  // Atempt to load movie if not present in cashe
  const movieCall: ApiResponse = await getTheMovieDBMovieById(movieId);

  // Update cashe and return if movie sucsessfully loads
  if (movieCall.sucsess && movieCall.movie) {
    movieCasheProvider.addMovieToCashe(movieCall.movie);
    return movieCall.movie;
  } else {
    console.error(`Failed to load movie ${movieId}: ${movieCall.error}`);
  }
}
