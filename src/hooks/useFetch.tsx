// import { useState, useEffect } from "react";
// import { getTheMovieDBMovieById } from "../models/loadMovie";

// const useFetch = (url) => {
//   const [movie, setMovie] = useState<Movie | undefined>(undefined);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadMovie = async () => {
//       console.log("useEffect: loadMovie function called ");
//       setLoading(true);
//       setError(null);

//       console.log(`Loading movie id:  ${movieId}`);

//       try {
//         const movieReq = await getMovieById(movieId);
//         if (movieReq.sucsess) {
//           const mv: Movie | undefined = movieReq.movie;
//           setMovie(mv);
//           console.log("Movie sucsessfully set");
//         } else {
//           setError(`Movie with ID ${movieId} not found`);
//           console.log(`Error: Movie with ID ${movieId} not found`);
//         }
//       } catch (error) {
//         setError(`Failed to fetch movie: ${error}`);
//         console.error(`Failed to fetch movie: ${error}`);
//       } finally {
//         setLoading(false);
//         console.log("Loading state set to false");
//       }
//     };
//     loadMovie();
//   }, []);
// };
