import "./app.css";
import { VoteAverage } from "./components/voteAverage/VoteAverage";
import { MovieCard } from "./movieCard/movieCard";
import { MovieDetails } from "./movieDetails/movieDetails";
import { ReviewCard } from "./reviewCard/reviewCard";
import apiClient from "./services/api-client";
import { Movie, Review, Trailer } from "./types";
import { YoutubeTrailer } from "./youtubeTrailer/youtubeTrailer";

customElements.define("youtube-trailer", YoutubeTrailer);
customElements.define("review-card", ReviewCard);
customElements.define("vote-average", VoteAverage);

class App {

  isFetching = false;
  currentPage = 1;

  constructor() {
    this.clearErrorMessage();
    this.setupListeners();
    this.fetchNowPlaying(this.currentPage);
  }

  setupListeners = () => {
    const searchInput = document.querySelector<HTMLInputElement>("#search-input");

    searchInput?.addEventListener(
      "input",
      (event) => {
        this.scrollToTheTop();
        const query = (event.target as HTMLInputElement).value.trim();
        if (query.length > 0) {
          this.isFetching = true;
          this.currentPage = 1;
          this.fetchSearchResults(query, this.currentPage);
          this.updateResultsPageTitle(`Search results for "${query}"`);
        } else {
          this.isFetching = true;
          this.currentPage = 1;
          this.fetchNowPlaying(this.currentPage);
          this.updateResultsPageTitle("In Theaters");
        }
      },
      { passive: true }
    );

    window.addEventListener("scroll", async () => {
      // Do not run if currently fetching
      if (this.isFetching) return;

      const windowHeight = window.innerHeight; // Viewport height
      const documentHeight = document.documentElement.scrollHeight; // Document height
      const scrollTop = 
        window.scrollY || 
        document.documentElement.scrollTop || 
        document.body.scrollTop; // Scroll position

      if (scrollTop + windowHeight >= documentHeight - 100) {
        this.isFetching = true;
        this.currentPage++;

        const searchValue = searchInput?.value.trim() || "";
        searchValue === ""
          ? this.fetchNowPlaying(this.currentPage)
          : this.fetchSearchResults(searchValue, this.currentPage);
      }
    });
  }

  scrollToTheTop = () => {
    const header = document.querySelector<HTMLHeadingElement>(".header");
    const pageTitle = document.querySelector<HTMLHeadingElement>("#page-title");
    const results = document.querySelector<HTMLDivElement>("div.results");
    
    // Scroll to the top of the page
    results?.scrollIntoView({ behavior: "instant" });
    const height = (header?.offsetHeight || 0) + (pageTitle?.offsetHeight || 0);
    window.scrollBy(0, -height || 200);
  }

  showErrorMessage = (message: string): void => {
    const errorMessage = document.querySelector<HTMLDivElement>("#error-message");
    if (errorMessage) {
      errorMessage.innerText = message;
      errorMessage.style.display = "block";
    }
  }

  clearErrorMessage = (): void => {
    const errorMessage = document.querySelector<HTMLDivElement>("#error-message");
    if (errorMessage) {
      errorMessage.style.display = "none";
    }
  }

  updateResultsPageTitle = (title: string): void => {
    const pageTitle = document.querySelector<HTMLHeadingElement>("#page-title");
    if (pageTitle) {
      pageTitle.innerText = title;
    }
  }

  clearResults = (): void => {
    const results = document.querySelector<HTMLDivElement>("div.results");
    if (results) {
      results.innerHTML = "";
    }
  }

  appendMovies = (movies: Movie[]): void => {
    const results = document.querySelector<HTMLDivElement>("div.results");
    if (results) {
      movies.forEach((movie) => {
        const movieCard = new MovieCard(movie, (event) => {
          event.preventDefault();
          // alert(`${movie.title}\n\n${movie.overview}`);
          this.showMovieDetails(movie);
        });
    
        // Append the movie card to the results list
        results.appendChild(movieCard);
      });
    }
  }
  
  showMovieDetails = (movie: Movie) => {
    const movieDetails = new MovieDetails(movie);
    const movieDetailsDialog = document.querySelector<HTMLDialogElement>("#movie-details-dialog");
    if (movieDetailsDialog) {
      movieDetailsDialog.innerHTML = "";
      movieDetailsDialog.appendChild(movieDetails);
      movieDetailsDialog.showModal();

      movieDetailsDialog.addEventListener("close", () => {
        // Enable scrolling on the body
        document.body.style.overflow = "auto";
      });

      movieDetailsDialog.querySelector<HTMLButtonElement>(".close-button")?.addEventListener("click", () => {
        movieDetailsDialog.close();
      });
      movieDetailsDialog.addEventListener("click", (event) => {
        if (event.target === movieDetailsDialog) {
          movieDetailsDialog.close();
        }
      });

      // Disable scrolling on the body after .5s
      setTimeout(() => {
        document.body.style.overflow = "hidden";
      }, 500);

      apiClient.getMovieTrailers(movie.id).then((response) => {
        this.addMovieTrailers(movieDetailsDialog, response.results);
      });

      apiClient.getMovieReviews(movie.id).then((response) => {
        this.addMovieReviews(movieDetailsDialog, response.results);
      });
      
      apiClient.getSimilarMovies(movie.id).then((response) => {
        this.addSimilarMovies(movieDetailsDialog, response.results);
      });
    }
  }

  addMovieTrailers = (movieDetails: HTMLDialogElement, trailers: Trailer[]): void => {
    const trailersContainer =
      movieDetails.querySelector<HTMLDivElement>(".trailers-container .trailers");
    if (!trailersContainer) return;

    if (trailers.length === 0 && trailersContainer.parentElement) {
      trailersContainer.parentElement.style.display = "none"; // Hide the trailers section
    } else {
      trailers.filter((trailer) => trailer.site === "YouTube").slice(0, 4).forEach((trailer) => {
        const youtubeTrailer = new YoutubeTrailer(trailer);
        trailersContainer.appendChild(youtubeTrailer);
      });
    }
  }

  addMovieReviews = (movieDetails: HTMLDialogElement, reviews: Review[]): void => {
    const reviewsContainer =
      movieDetails.querySelector<HTMLDivElement>(".reviews-container .reviews");
    if (!reviewsContainer) return;

    if (reviews.length === 0 && reviewsContainer.parentElement) {
      reviewsContainer.parentElement.style.display = "none"; // Hide the reviews section
    } else {
      reviews.slice(0, 2).forEach((review) => {
        const reviewCard = new ReviewCard(review);
        reviewsContainer.appendChild(reviewCard);
      });
    }
  }

  addSimilarMovies = (movieDetails: HTMLDialogElement, movies: Movie[]): void => {
    const similarMoviesContainer =
      movieDetails.querySelector<HTMLDivElement>(".similar-movies-container .movies");
    if (!similarMoviesContainer) return;

    if (movies.length === 0 && similarMoviesContainer.parentElement) {
      similarMoviesContainer.parentElement.style.display = "none"; // Hide the similar movies section
    } else {
      movies.slice(0, 4).forEach((movie) => {
        const similarMovieCard = new MovieCard(movie, (event) => {
          event.preventDefault();
          this.showMovieDetails(movie);
        });
        similarMoviesContainer.appendChild(similarMovieCard);
      });
    }
  }
  
  fetchSearchResults = async (query: string, page: number) => {
    this.clearErrorMessage();
    try {
      const response = await apiClient.searchMovies({ query, page });
      if (page === 1) this.clearResults();
      this.appendMovies(response.results);
    } catch (error) {
      this.currentPage--;
      this.showErrorMessage("Error fetching search results");
    } finally {
      this.isFetching = false;
    }
  }

  fetchNowPlaying = async (page: number) => {
    this.clearErrorMessage();
    try {
      const response = await apiClient.getNowPlaying({ page });
      if (page === 1) this.clearResults();
      this.appendMovies(response.results);
    } catch (error) {
      this.currentPage--;
      this.showErrorMessage("Error fetching now playing");
    } finally {
      this.isFetching = false;
    }
  }
}

export default new App();
