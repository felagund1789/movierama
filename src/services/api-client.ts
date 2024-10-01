const API_URL = import.meta.env.VITE_TMDB_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

class ApiClient {
  async fetch<T>(path: string): Promise<T> {
    const response = await fetch(`${API_URL}${path}&api_key=${API_KEY}`);
    return response.json();
  }
}

export default new ApiClient();
