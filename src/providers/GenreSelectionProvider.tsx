import { Children, createContext, PropsWithChildren, useContext, useState } from "react";
import { MovieGenres } from "@/types";

// type GenreSelectionType : {
//   Action: boolean;
//   Adventure: boolean;
//   Animation: boolean;
//   Comedy: boolean;
//   Crime: boolean;
//   Documentary: boolean;
//   Drama: boolean;
//   Family: boolean;
//   Fantasy: boolean;
//   History: boolean;
//   Horror: boolean;
//   Music: boolean;
//   Mystery: boolean;
//   Romance: boolean;
//   Science_Fiction: boolean;
//   TV_Movie: boolean;
//   Thriller: boolean;
//   War: boolean;
//   Western: boolean;
// };

// type GenreSelectionType = {
//   [MovieGenres.Action]: boolean;
//   [MovieGenres.Adventure]: boolean;
//   [MovieGenres.Animation]: boolean;
//   [MovieGenres.Comedy]: boolean;
//   [MovieGenres.Crime]: boolean;
//   [MovieGenres.Documentary]: boolean;
//   [MovieGenres.Drama]: boolean;
//   [MovieGenres.Family]: boolean;
//   [MovieGenres.Fantasy]: boolean;
//   [MovieGenres.History]: boolean;
//   [MovieGenres.Horror]: boolean;
//   [MovieGenres.Music]: boolean;
//   [MovieGenres.Mystery]: boolean;
//   [MovieGenres.Romance]: boolean;
//   [MovieGenres.Science_Fiction]: boolean;
//   [MovieGenres.TV_Movie]: boolean;
//   [MovieGenres.Thriller]: boolean;
//   [MovieGenres.War]: boolean;
//   [MovieGenres.Western]: boolean;
// };

type GenreSelectionType = {
  [key in MovieGenres]: boolean;
};

export const GenreSelectionContext = createContext<GenreSelectionType>({
  [MovieGenres.Action]: false,
  [MovieGenres.Adventure]: false,
  [MovieGenres.Animation]: false,
  [MovieGenres.Comedy]: false,
  [MovieGenres.Crime]: false,
  [MovieGenres.Documentary]: false,
  [MovieGenres.Drama]: false,
  [MovieGenres.Family]: false,
  [MovieGenres.Fantasy]: false,
  [MovieGenres.History]: false,
  [MovieGenres.Horror]: false,
  [MovieGenres.Music]: false,
  [MovieGenres.Mystery]: false,
  [MovieGenres.Romance]: false,
  [MovieGenres.Science_Fiction]: false,
  [MovieGenres.TV_Movie]: false,
  [MovieGenres.Thriller]: false,
  [MovieGenres.War]: false,
  [MovieGenres.Western]: false,
});

const GenreSelectionProvider = ({ children }: PropsWithChildren) => {
  const [genreSelection, setGenreSelection] = useState<GenreSelectionType>(defaultGenreSelection);

  const changeGenreSelection = (genre: MovieGenres, selection: boolean) => {
    const newGenreSelection = genreSelection as GenreSelectionType;
    newGenreSelection[genre] = selection;
    setGenreSelection(newGenreSelection);
    console.log(`[Genre Selection Provider] Udated genre selection ${genre} to ${selection}`);
  };

  const areGenresSelected = () => {
    return genreSelection;
  };

  return <GenreSelectionContext.Provider value={genreSelection}>{children}</GenreSelectionContext.Provider>;
};

export default GenreSelectionProvider;

export const useGenreSelction = () => useContext(GenreSelectionContext);

const defaultGenreSelection: GenreSelectionType = {
  [MovieGenres.Action]: false,
  [MovieGenres.Adventure]: false,
  [MovieGenres.Animation]: false,
  [MovieGenres.Comedy]: false,
  [MovieGenres.Crime]: false,
  [MovieGenres.Documentary]: false,
  [MovieGenres.Drama]: false,
  [MovieGenres.Family]: false,
  [MovieGenres.Fantasy]: false,
  [MovieGenres.History]: false,
  [MovieGenres.Horror]: false,
  [MovieGenres.Music]: false,
  [MovieGenres.Mystery]: false,
  [MovieGenres.Romance]: false,
  [MovieGenres.Science_Fiction]: false,
  [MovieGenres.TV_Movie]: false,
  [MovieGenres.Thriller]: false,
  [MovieGenres.War]: false,
  [MovieGenres.Western]: false,
};
