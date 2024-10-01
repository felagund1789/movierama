import { Trailer } from "../types";
import apiClient from "./api-client";

interface TrailersResponse {
  id: string;
  results: Trailer[];
}

class TrailerService {

  getMovieTrailers = async (movieId: number): Promise<TrailersResponse> => {
    return apiClient.fetch(`/movie/${movieId}/videos?`);
  }
}

const trailerService = new TrailerService();

export default trailerService;
