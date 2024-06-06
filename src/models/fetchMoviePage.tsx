import axios from "axios";
import { DiscoverMovie, DiscoverMovieResponse } from "@/types";

// Currently default parameters

interface ApiResponse {
  sucsess: boolean;
  discoverMovies?: DiscoverMovie[];
  error?: string;
}

export async function getTheMovieDBPage(pageNumber: number): Promise<ApiResponse> {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie",
    params: {
      include_adult: "false",
      include_video: "true",
      language: "en-US",
      page: pageNumber.toString(),
      sort_by: "popularity.desc",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_THE_MOVIE_DB_ACCESS_TOKEN}`,
    },
  };

  try {
    const responce: DiscoverMovieResponse = (await axios.request(options)).data;
    console.log(`[Load Page] Sucsessful call to movie page ${pageNumber}`);
    return { sucsess: true, discoverMovies: responce.results };
  } catch (error: any) {
    console.log(`[Load Page] Failed call to movie page ${pageNumber}`);
    return { sucsess: false, error: error.message };
  }
}
