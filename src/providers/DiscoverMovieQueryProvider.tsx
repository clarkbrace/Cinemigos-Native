import { DiscoverMovieQueryParams } from "@/types";
import { createContext, PropsWithChildren, useContext, useRef } from "react";
import { default_query } from "@/types";
import _ from "lodash";

type DiscoverMovieQuery = {
  getDiscoverQuery: () => DiscoverMovieQueryParams;
  updateIncludeAdult: (include_adult: boolean) => void;
  setGenreSelection: (genres: string) => void;
};

export const DiscoverMovieQueryContext =
  createContext<DiscoverMovieQuery | null>(null);

const DiscoverMovieQueryProvider = ({ children }: PropsWithChildren) => {
  // State
  const discoverQuery = useRef(default_query);
  const updateIncludeAdult = (include_adult: boolean) => {
    discoverQuery.current.include_adult = include_adult;
  };

  // Increases current page number
  const increasePageNumber = () => {
    console.log("increaseing page count");
    if (!discoverQuery.current.page) {
      discoverQuery.current.page = 1;
      return;
    }
    discoverQuery.current.page += 1;
  };

  // Resets page number
  const resetPageNumber = () => {
    discoverQuery.current.page = 1;
  };

  // Sets new genre selection
  const setGenreSelection = (newGenreSelection: string) => {
    discoverQuery.current.with_genres = newGenreSelection;
    console.log(`[Set Genre Selection]: ${newGenreSelection}`);
    resetPageNumber();
  };

  // Returns the users current selection query with all selected parameters
  const getDiscoverQuery = () => {
    const query: DiscoverMovieQueryParams = _.cloneDeep(discoverQuery.current);
    increasePageNumber(); // Increase current page number
    return query;
  };

  return (
    <DiscoverMovieQueryContext.Provider
      value={{
        getDiscoverQuery,
        updateIncludeAdult,
        setGenreSelection,
      }}
    >
      {children}
    </DiscoverMovieQueryContext.Provider>
  );
};

export default DiscoverMovieQueryProvider;

export const useDiscoverMovieQueryParams = () => {
  const context = useContext(DiscoverMovieQueryContext);

  if (!context) {
    throw new Error(
      `useDiscoverMovieQueryParams context must be used within Discover Movie Query Provider`
    );
  }

  return context;
};
