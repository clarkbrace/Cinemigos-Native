import { default_query, DiscoverMovieQueryParams } from "@/types";
import { Children, createContext, PropsWithChildren, useContext, useState } from "react";

type DiscoverMovieQuery = {
  discoverQuery: DiscoverMovieQueryParams;
  updateIncludeAdult: (include_adult: boolean) => void;
  increasePageNumber: () => void;
};

export const DiscoverMovieQueryContext = createContext<DiscoverMovieQuery>({
  discoverQuery: default_query,
  updateIncludeAdult: (include_adult: boolean) => {},
  increasePageNumber: () => {},
});

const DiscoverMovieQueryProvider = ({ children }: PropsWithChildren) => {
  const [discoverQuery, setDiscoverQuery] = useState(default_query);
  const [pageNumber, setPageNumber] = useState(1);

  // Maybe generalise to accept list of params to update?
  const updateIncludeAdult = (include_adult: boolean) => {
    // setDiscoverQuery((discoverQuery.include_adult = include_adult));
    const newQuery = discoverQuery as DiscoverMovieQueryParams;
    newQuery.include_adult = include_adult;
    setDiscoverQuery(newQuery);
  };

  const increasePageNumber = () => {
    setPageNumber(pageNumber + 1);
    updatePageNumber();
  };

  const updatePageNumber = () => {
    const newQuery = discoverQuery as DiscoverMovieQueryParams;
    newQuery.page = pageNumber;
    setDiscoverQuery(newQuery);
  };

  return (
    <DiscoverMovieQueryContext.Provider
      value={{
        discoverQuery,
        updateIncludeAdult,
        increasePageNumber,
      }}
    >
      {children}
    </DiscoverMovieQueryContext.Provider>
  );
};

export default DiscoverMovieQueryProvider;

export const useDiscoverMovieQueryParams = () => useContext(DiscoverMovieQueryContext);
