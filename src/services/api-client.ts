import { Genre, Movie, Review, Trailer } from "../types";

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

interface TrailersResponse {
  id: string;
  results: Trailer[];
}

interface ReviewsResponse {
  id: string;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
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

  async searchMovies({ page, query }: SearchParms): Promise<MoviesResponse> {
    return this.fetch(`/search/movie?query=${encodeURIComponent(query)}&page=${page.toString()}`);
  }

  async getMovieTrailers(movieId: number): Promise<TrailersResponse> {
    return this.fetch(`/movie/${movieId}/videos?`);
  }

  async getMovieReviews(movieId: number): Promise<ReviewsResponse> {
    return this.fetch(`/movie/${movieId}/reviews?`);
  }

  async getSimilarMovies(movieId: number): Promise<MoviesResponse> {
    return this.fetch(`/movie/${movieId}/similar?`);
  }
}

export default new ApiClient();
