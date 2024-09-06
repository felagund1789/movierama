const API_URL = import.meta.env.VITE_TMDB_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface GetGenresResponse {
  genres: Genre[];
}

interface GetNowPlayingResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

class ApiClient {
  private async fetch<T>(path: string): Promise<T> {
    const response = await fetch(`${API_URL}${path}&api_key=${API_KEY}`);
    return response.json();
  }

  async getGenres(): Promise<GetGenresResponse> {
    return this.fetch("/genre/movie/list?");
  }

  async getNowPlaying({ page = 1 }: { page: number }): Promise<GetNowPlayingResponse> {
    return this.fetch(`/movie/now_playing?page=${page.toString()}`);
  }
}

export default new ApiClient();
