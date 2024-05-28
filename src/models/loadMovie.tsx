import axios from "axios";
import { Movie } from "@/types";

interface ApiResponse {
  sucsess: boolean;
  movie: Movie | undefined;
}

export async function getMovieById(movieId: number): Promise<ApiResponse> {
  console.log("Begin Api request");
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
    const responce: Movie = await axios.request(options);
    return { sucsess: true, movie: responce };
  } catch (error) {
    return { sucsess: false, movie: undefined };
  }
}
