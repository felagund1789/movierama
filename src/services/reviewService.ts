import { Review } from "../types";
import apiClient from "./api-client";

interface ReviewsResponse {
    id: string;
    page: number;
    results: Review[];
    total_pages: number;
    total_results: number;
  }
  
class ReviewService {

  getMovieReviews = async (movieId: number): Promise<ReviewsResponse> => {
    return apiClient.fetch(`/movie/${movieId}/reviews?`);
  }
}

const reviewService = new ReviewService();

export default reviewService;
