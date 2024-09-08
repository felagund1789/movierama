import { Genre, Movie } from "../types";

const API_URL = import.meta.env.VITE_TMDB_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface GenresResponse {
  genres: Genre[];
}

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

class ApiClient {
  private async fetch<T>(path: string): Promise<T> {
    const response = await fetch(`${API_URL}${path}&api_key=${API_KEY}`);
    return response.json();
  }

  async getGenres(): Promise<GenresResponse> {
    return this.fetch("/genre/movie/list?");
  }

  async getNowPlaying({ page }: { page: number }): Promise<MoviesResponse> {
    return this.fetch(`/movie/now_playing?page=${page.toString()}`);
  }

  async searchMovies({
    page,
    query,
  }: SearchParms): Promise<MoviesResponse> {
    return this.fetch(`/search/movie?query=${encodeURIComponent(query)}&page=${page.toString()}`);
  }
}

export default new ApiClient();