import { Movie } from "@/types";
import { createContext, PropsWithChildren, useRef } from "react";

// TODO: Change cashedMovieIds to Double LinkedList + add current index to movie cashe along with movie for extra speed

const CASHE_SIZE = 20;

// type MovieCasheType = {
//   cashedMovieIds: number[];
//   movieCashe: Map<number, Movie>;
//   casheMovie: () => void;
// };

// export const MovieCasheContext = createContext<MovieCasheType>({
//   cashedMovieIds: [],
//   movieCashe: new Map<number, Movie>(),
//   casheMovie: () => {},
// });

const MovieCashe = ({ children }: PropsWithChildren) => {
  const cashedMovieIds = useRef<number[]>([]);
  const movieCashe = useRef(new Map<number, Movie>());

  const addMovieToCashe = (movie: Movie) => {
    // Check to see if cashe is full
    if (cashedMovieIds.current.length >= CASHE_SIZE) {
      const leastCalledMovie = cashedMovieIds.current[-1];

      // Remove movie from cashe
      movieCashe.current.delete(leastCalledMovie);
      cashedMovieIds.current.pop();
    }

    // Add movie to cashe
    movieCashe.current.set(movie.id, movie);
    cashedMovieIds.current.unshift(movie.id);
  };

  // I kinda hate this implemntaion. Wreaks the runtime bonus from using map + array
  const getMovieFromCashe = (movieId: number) => {
    if (!movieCashe.current.has(movieId)) {
      return undefined;
    }

    // Add movie id to top of cashedMovieIds
    cashedMovieIds.current = cashedMovieIds.current.filter(
      (movieId) => movieId !== movieId
    );
    cashedMovieIds.current.unshift(movieId);

    return movieCashe.current.get(movieId);
  };
};

export default MovieCashe;
