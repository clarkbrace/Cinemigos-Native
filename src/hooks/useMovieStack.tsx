import { DiscoverMovieResponse } from "@/types";
import { useState } from "react";

// Manages Stack, when movies getg low a request needs to be made to add more
// In future will need to manage genre and more specific selecitons


const useStackManager = () => {

  // Load Data
  const [moviePage, setMoviePage] = useState<DiscoverMovieResponse | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadPage = async (pageNumber: number) => {
    try {
    } catch (error) {}
  };

  const filterByUnseen = () => {};
};


