export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any; // or you can define a specific interface if you know the structure
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export enum LoginButtonType {
  Apple,
  Google,
  Email_Password,
  No_Account,
}

export interface DiscoverMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface DiscoverMovieResponse {
  page: number;
  results: DiscoverMovie[];
  total_pages: number;
  total_results: number;
}

export interface DiscoverMovieQueryParams {
  sort_by?:
    | "popularity.asc"
    | "popularity.desc"
    | "release_date.asc"
    | "release_date.desc"
    | "revenue.asc"
    | "revenue.desc"
    | "primary_release_date.asc"
    | "primary_release_date.desc"
    | "original_title.asc"
    | "original_title.desc"
    | "vote_average.asc"
    | "vote_average.desc"
    | "vote_count.asc"
    | "vote_count.desc";
  primary_release_year?: number;
  primary_release_date_gte?: string; // format YYYY-MM-DD
  primary_release_date_lte?: string; // format YYYY-MM-DD
  release_date_gte?: string; // format YYYY-MM-DD
  release_date_lte?: string; // format YYYY-MM-DD
  vote_count_gte?: number;
  vote_count_lte?: number;
  vote_average_gte?: number;
  vote_average_lte?: number;
  with_genres?: string; // comma or pipe separated genre IDs
  certification_country?: string;
  certification?: string;
  certification_lte?: string;
  with_original_language?: string;
  region?: string;
  with_companies?: string; // comma or pipe separated company IDs
  with_keywords?: string; // comma or pipe separated keyword IDs
  with_people?: string; // comma or pipe separated person IDs
  with_watch_providers?: string; // comma or pipe separated provider IDs
  watch_region?: string;
  with_release_type?: string; // comma or pipe separated release type IDs
  include_adult?: boolean;
  include_video?: boolean;
  page?: number;
  year?: number;
  language?: string; // language code (e.g., en-US, es-ES)
}

// Default search parameter
export const default_query: DiscoverMovieQueryParams = {
  include_adult: true,
  include_video: false,
  language: "en-US",
  page: 1,
  sort_by: "popularity.desc",
  with_genres: "",
};

// Example query
const queryParams: DiscoverMovieQueryParams = {
  sort_by: "popularity.desc",
  primary_release_year: 2023,
  primary_release_date_gte: "2023-01-01",
  primary_release_date_lte: "2023-12-31",
  release_date_gte: "2023-01-01",
  release_date_lte: "2023-12-31",
  vote_count_gte: 100,
  vote_count_lte: 1000,
  vote_average_gte: 7.0,
  vote_average_lte: 10.0,
  with_genres: "28,12", // Action AND Adventure
  certification_country: "US",
  certification: "PG-13",
  certification_lte: "R",
  with_original_language: "en",
  region: "US",
  with_companies: "420,1957", // Warner Bros. Pictures AND Pixar Animation Studios
  with_keywords: "action|thriller", // Action OR Thriller
  with_people: "3223,1892", // Leonardo DiCaprio AND Tom Hanks
  with_watch_providers: "8|9", // Netflix OR Amazon Prime Video
  watch_region: "US",
  with_release_type: "3,4", // Theatrical AND Digital
  include_adult: false,
  include_video: false,
  page: 1,
  year: 2023,
};

export enum MovieGenres {
  Action = 28,
  Adventure = 12,
  Animation = 16,
  Comedy = 35,
  Crime = 80,
  Documentary = 99,
  Drama = 18,
  Family = 10751,
  Fantasy = 14,
  History = 36,
  Horror = 27,
  Music = 10402,
  Mystery = 9648,
  Romance = 10749,
  Science_Fiction = 878,
  TV_Movie = 10770,
  Thriller = 53,
  War = 10752,
  Western = 37,
}

interface Genres {
  genres: [
    {
      id: 28;
      name: "Action";
    },
    {
      id: 12;
      name: "Adventure";
    },
    {
      id: 16;
      name: "Animation";
    },
    {
      id: 35;
      name: "Comedy";
    },
    {
      id: 80;
      name: "Crime";
    },
    {
      id: 99;
      name: "Documentary";
    },
    {
      id: 18;
      name: "Drama";
    },
    {
      id: 10751;
      name: "Family";
    },
    {
      id: 14;
      name: "Fantasy";
    },
    {
      id: 36;
      name: "History";
    },
    {
      id: 27;
      name: "Horror";
    },
    {
      id: 10402;
      name: "Music";
    },
    {
      id: 9648;
      name: "Mystery";
    },
    {
      id: 10749;
      name: "Romance";
    },
    {
      id: 878;
      name: "Science Fiction";
    },
    {
      id: 10770;
      name: "TV Movie";
    },
    {
      id: 53;
      name: "Thriller";
    },
    {
      id: 10752;
      name: "War";
    },
    {
      id: 37;
      name: "Western";
    }
  ];
}
