import axios from "axios";
import {
  DiscoverMovie,
  DiscoverMovieQueryParams,
  DiscoverMovieResponse,
} from "@/types";
// Currently default parameters

export interface PageResponse {
  sucsess: boolean;
  discoverMovies?: DiscoverMovieResponse;
  error?: string;
}

export async function getMoviePageByQueryParameters(
  discoverMovieParams: DiscoverMovieQueryParams
): Promise<PageResponse> {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie",
    params: discoverMovieParams,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_THE_MOVIE_DB_ACCESS_TOKEN}`,
    },
  };

  console.log(`[Page number] ${discoverMovieParams.page}`);

  try {
    const discoverMovieResponce: DiscoverMovieResponse = (
      await axios.request(options)
    ).data;
    console.log(
      `[Load Page] Sucsessful call to movie page ${discoverMovieParams.page} with the genres ${discoverMovieParams.with_genres}`
    );
    return { sucsess: true, discoverMovies: discoverMovieResponce };
  } catch (error: any) {
    console.log(
      `[Load Page] Failed call to movie page ${discoverMovieParams.page}`
    );
    return { sucsess: false, error: error.message };
  }
}
