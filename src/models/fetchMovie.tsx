import axios from "axios";
import { Movie } from "@/types";

export interface MovieResponse {
  sucsess: boolean;
  movie?: Movie;
  error?: string;
}

export async function getTheMovieDBMovieById(
  movieId: number
): Promise<MovieResponse> {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movieId}`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_THE_MOVIE_DB_ACCESS_TOKEN}`,
    },
  };

  // Atempt to get movie data

  try {
    const responce: Movie = (await axios.request(options)).data;
    console.log(`[Load Movie API] Sucsessful call to movie id: ${movieId}`);
    return { sucsess: true, movie: responce };
  } catch (error: any) {
    console.log(`[Load Movie] Failed call to movie id: ${movieId}`);
    return { sucsess: false, error: error.message };
  }
}
