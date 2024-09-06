import apiClient from "./api-client";
import { appendMovies } from "./movies";

apiClient.getNowPlaying({ page: 1 }).then((response) => {
  appendMovies(response.results);
});
