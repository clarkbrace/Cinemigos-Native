import {
  Children,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { MovieGenres } from "@/types";
import { useDiscoverMovieQueryParams } from "./DiscoverMovieQueryProvider";
import { useMovieStackDataProvider } from "./MovieStackProvider";

type GenreSelectionControlerType = {
  changeGenreSelection: (genre: MovieGenres, selection: boolean) => void;
  getGenreSelection: () => GenreSelectionType;
};

export const GenreSelectionContext =
  createContext<GenreSelectionControlerType | null>(null);

const GenreSelectionProvider = ({ children }: PropsWithChildren) => {
  // State
  const discoverMovieQueryProvider = useDiscoverMovieQueryParams();
  const movieStackData = useMovieStackDataProvider();
  const [genreSelection, setGenreSelection] = useState<GenreSelectionType>(
    defaultGenreSelection
  );

  // Changes the users genre selection
  const changeGenreSelection = (genre: MovieGenres, selection: boolean) => {
    const newGenreSelection = MovieGenres[genre] as keyof typeof MovieGenres;
    setGenreSelection((prevState) => ({
      ...prevState,
      [newGenreSelection]: selection,
    }));

    console.log(
      `[Genre Selection Provider] Updated genre selection ${genre} to ${selection}`
    );
  };

  // Getter for the current genre selection
  const getGenreSelection = () => {
    return genreSelection;
  };

  // Formates genre selection in query format for the movie db Ex: (22 | 25), (12 & 33) 
  const formatGenreSelection = () => {
    let formattedSelection = "";

    for (const key in genreSelection) {
      if (genreSelection[key]) {
        formattedSelection += `${MovieGenres[key]} | `;
      }
    }

    if (formattedSelection === "") {
      return "";
    }

    // Remove last of | symbol
    return formattedSelection.slice(0, -2);
  };

  // UpdateDiscoverMovieQuery with new genre selection
  useEffect(() => {
    const newFormattedString = formatGenreSelection();
    console.log(
      `[Genre Selection Provider] New genre selection: ${newFormattedString}`
    );

    // Update discover query to reflect change in genre
    discoverMovieQueryProvider.setGenreSelection(newFormattedString);
    console.log(`[Genre Selection Provider] Resetting due to new genre`);
    movieStackData.resetStack();
  }, [genreSelection]);

  return (
    <GenreSelectionContext.Provider
      value={{ changeGenreSelection, getGenreSelection }}
    >
      {children}
    </GenreSelectionContext.Provider>
  );
};

export default GenreSelectionProvider;

export const useGenreSelction = () => {
  const genreSelectionContext = useContext(GenreSelectionContext);

  if (!genreSelectionContext) {
    throw new Error(
      `useGenre Selection must be used within GenreSelection Provider`
    );
  }
  return genreSelectionContext;
};

type GenreSelectionType = {
  [key in keyof typeof MovieGenres]: boolean;
};

const defaultGenreSelection: GenreSelectionType = {
  Action: false,
  Adventure: false,
  Animation: false,
  Comedy: false,
  Crime: false,
  Documentary: false,
  Drama: false,
  Family: false,
  Fantasy: false,
  History: false,
  Horror: false,
  Music: false,
  Mystery: false,
  Romance: false,
  Science_Fiction: false,
  TV_Movie: false,
  Thriller: false,
  War: false,
  Western: false,
};
