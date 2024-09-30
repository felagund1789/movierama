import { Movie } from "../types";
import apiClient from "./api-client";

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface SearchParms {
  page: number;
  query: string;
}

class MovieService {
  
  getNowPlaying = async ({ page }: { page: number }): Promise<MoviesResponse> => {
    return apiClient.fetch<MoviesResponse>(`/movie/now_playing?page=${page.toString()}`);
  }

  searchMovies = async ({ page, query }: SearchParms): Promise<MoviesResponse> => {
    return apiClient.fetch<MoviesResponse>(`/search/movie?query=${encodeURIComponent(query)}&page=${page.toString()}`);
  }

  getSimilarMovies = async (movieId: number): Promise<MoviesResponse> => {
    return apiClient.fetch<MoviesResponse>(`/movie/${movieId}/similar?`);
  }
}

const movieService = new MovieService();

export default movieService;
