

// export type Movie = {
//     adult: boolean,
//     backdrop_path: string ,
//     belongs_to_collection: {
//         id: number,
//         name: string,
//         poster_path: string,
//         backdrop_path: string
//     },
//     budget: number,
//     genres: [
//         {
//             id: number,
//             name: string
//         },
//         {
//             id: number,
//             name: string
//         },
//         {
//             id: number,
//             name: string
//         },
//         {
//             id: number,
//             name: string
//         }
//     ],
//     homepage: string,
//     id: number,
//     imdb_id: string,
//     origin_country: [
//         string
//     ],
//     original_language: string,
//     original_title: string,
//     overview: string,
//     popularity: number,
//     poster_path: string,
//     production_companies: [
//         {
//             id: number,
//             logo_path: string,
//             name: string,
//             origin_country: string
//         },
//         {
//             id: number,
//             logo_path: string,
//             name: string,
//             origin_country: string
//         }
//     ],
//     production_countries: [
//         {
//             iso_3166_1: string,
//             name: string
//         }
//     ],
//     release_date: string,
//     revenue: number,
//     runtime: number,
//     spoken_languages: [
//         {
//             english_name: string,
//             iso_639_1: string,
//             name: string
//         }
//     ],
//     status: string,
//     tagline: string,
//     title: string,
//     video: boolean,
//     vote_average: number,
//     vote_count: number
// }


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
  
  interface Genre {
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