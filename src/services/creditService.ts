import { Cast, Crew } from "../types";
import apiClient from "./api-client";

interface CreditsResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

class CreditService {
  
  getMovieCredits = async (movieId: number): Promise<CreditsResponse> => {
    return apiClient.fetch(`/movie/${movieId}/credits?`);
  }
}

const creditService = new CreditService();

export default creditService;
