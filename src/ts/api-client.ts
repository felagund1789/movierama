const API_URL = import.meta.env.VITE_TMDB_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export interface Genre {
  id: number;
  name: string;
}

interface GetGenresResponse {
  genres: Genre[];
}

class ApiClient {
  private async fetch<T>(path: string): Promise<T> {
    const response = await fetch(`${API_URL}${path}?api_key=${API_KEY}`);
    return response.json();
  }

  async getGenres(): Promise<GetGenresResponse> {
    return this.fetch("/genre/movie/list");
  }
}

export default new ApiClient();
