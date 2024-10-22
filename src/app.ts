import "./app.css";
import { CreditCard } from "./components/creditCard/CreditCard";
import { GenreTag } from "./components/genreTag/GenreTag";
import { ImdbTag } from "./components/imdbTag/ImdbTag";
import { MovieCard } from "./components/movieCard/MovieCard";
import { MovieDetails } from "./components/movieDetails/MovieDetails";
import { ReviewCard } from "./components/reviewCard/ReviewCard";
import { VoteAverage } from "./components/voteAverage/VoteAverage";
import { YoutubeTrailer } from "./components/youtubeTrailer/YoutubeTrailer";
import creditService from "./services/creditService";
import movieService from "./services/movieService";
import reviewService from "./services/reviewService";
import trailerService from "./services/trailerService";
import {
  Cast,
  Crew,
  Movie,
  MovieDetails as MovieFull,
  Review,
  Trailer
} from "./types";

customElements.define("youtube-trailer", YoutubeTrailer);
customElements.define("review-card", ReviewCard);
customElements.define("vote-average", VoteAverage);
customElements.define("genre-tag", GenreTag);
customElements.define("imdb-tag", ImdbTag);
customElements.define("credit-card", CreditCard);
customElements.define("movie-card", MovieCard);
customElements.define("movie-details", MovieDetails);

class App {

  debounceTimeout = 200;
  debounceTimer = 0;
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
        const query = (event.target as HTMLInputElement).value.trim();
        this.debounceFetchResults(query);
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

  debounceFetchResults = (query: string) => {
    clearTimeout(this.debounceTimer);

    const timerId = setTimeout(() => this.fetchResults(query), this.debounceTimeout);
    this.debounceTimer = timerId;
  }

  fetchResults = (query: string) => {
    this.scrollToTheTop();
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
        const movieCard = new MovieCard();
        movieCard.posterPath = movie.poster_path;
        movieCard.title = movie.title;
        movieCard.releaseDate = movie.release_date;
        movieCard.voteAverage = movie.vote_average?.toString();
        movieCard.genreIds = movie.genre_ids?.join(",");
        movieCard.overview = movie.overview;
        movieCard.onclick = (event) => {
          event.preventDefault();
          movieService.getMovieDetails(movie.id).then((movieDetails) => {
            this.showMovieDetails(movieDetails);
          });
        }
    
        // Append the movie card to the results list
        results.appendChild(movieCard);
      });
    }
  }
  
  showMovieDetails = (movie: MovieFull) => {
    const movieDetails = new MovieDetails();
    movieDetails.backdropPath = movie.backdrop_path;
    movieDetails.posterPath = movie.poster_path;
    movieDetails.title = movie.title;
    movieDetails.releaseDate = movie.release_date;
    movieDetails.runtime = movie.runtime?.toString();
    movieDetails.imdbId = movie.imdb_id;
    movieDetails.voteAverage = movie.vote_average?.toString();
    movieDetails.genres = movie.genres.map(genre => genre.name).join(",");
    movieDetails.overview = movie.overview;

    creditService.getMovieCredits(movie.id).then((response) => {
      this.addMovieCrew(movieDetails, response.crew);
      this.addMovieCast(movieDetails, response.cast);
    });

    trailerService.getMovieTrailers(movie.id).then((response) => {
      this.addMovieTrailers(movieDetails, response.results);
    });

    reviewService.getMovieReviews(movie.id).then((response) => {
      this.addMovieReviews(movieDetails, response.results);
    });
    
    movieService.getSimilarMovies(movie.id).then((response) => {
      this.addSimilarMovies(movieDetails, response.results);
    });

    const movieDetailsDialog = document.querySelector<HTMLDialogElement>("#movie-details-dialog");
    if (movieDetailsDialog) {
      movieDetailsDialog.innerHTML = "";
      movieDetailsDialog.appendChild(movieDetails);
      movieDetailsDialog.showModal();

      movieDetailsDialog.addEventListener("close", () => {
        // Enable scrolling on the body
        document.body.style.overflow = "auto";
        movieDetailsDialog.removeChild(movieDetails);
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
    }
  }

  addMovieCrew = (movieDetails: MovieDetails, crewMembers: Crew[]): void => {
    const crewContainer = movieDetails.querySelector<HTMLDivElement>(".crew-container");
    if (!crewContainer) return;

    if (crewMembers.length) {
      crewMembers.filter((crewMember) => crewMember.job === "Director").forEach((director) => {
        const creditCard = new CreditCard();
        creditCard.profilePhoto = director.profile_path;
        creditCard.creditName = director.name;
        creditCard.creditRole = "Director";
        crewContainer.appendChild(creditCard);
      });
      crewMembers.filter((crewMember) => crewMember.job === "Screenplay").forEach((writer) => {
        const creditCard = new CreditCard();
        creditCard.profilePhoto = writer.profile_path;
        creditCard.creditName = writer.name;
        creditCard.creditRole = "Writer";
        crewContainer.appendChild(creditCard);
      });
    }
  }

  addMovieCast = (movieDetails: MovieDetails, castMembers: Cast[]): void => {
    const castContainer = movieDetails.querySelector<HTMLDivElement>(".cast-container");
    if (!castContainer) return;

    if (castMembers.length) {
      castMembers.sort((a, b) => a.order - b.order).slice(0, 8).forEach((castMember) => {
        const creditCard = new CreditCard();
        creditCard.profilePhoto = castMember.profile_path;
        creditCard.creditName = castMember.name;
        creditCard.creditCharacter = castMember.character;
        castContainer.appendChild(creditCard);
      });
    }
  }

  addMovieTrailers = (movieDetails: MovieDetails, trailers: Trailer[]): void => {
    const trailersContainer =
      movieDetails.querySelector<HTMLDivElement>(".trailers-container .trailers");
    if (!trailersContainer) return;

    if (trailers.length === 0 && trailersContainer.parentElement) {
      trailersContainer.parentElement.style.display = "none"; // Hide the trailers section
    } else {
      trailers.filter((trailer) => trailer.site === "YouTube").slice(0, 4).forEach((trailer) => {
        const youtubeTrailer = new YoutubeTrailer();
        youtubeTrailer.trailerKey = trailer.key;
        youtubeTrailer.trailerName = trailer.name;
        trailersContainer.appendChild(youtubeTrailer);
      });
    }
  }

  addMovieReviews = (movieDetails: MovieDetails, reviews: Review[]): void => {
    const reviewsContainer =
      movieDetails.querySelector<HTMLDivElement>(".reviews-container .reviews");
    if (!reviewsContainer) return;

    if (reviews.length === 0 && reviewsContainer.parentElement) {
      reviewsContainer.parentElement.style.display = "none"; // Hide the reviews section
    } else {
      reviews.slice(0, 2).forEach((review) => {
        const reviewCard = new ReviewCard();
        reviewCard.authorName = review.author_details.name;
        reviewCard.authorUsername = review.author_details.username;
        reviewCard.authorAvatar = review.author_details.avatar_path;
        reviewCard.rating = review.author_details.rating?.toString();
        reviewCard.content = review.content;
        reviewCard.reviewUrl = review.url;
        reviewsContainer.appendChild(reviewCard);
      });
    }
  }

  addSimilarMovies = (movieDetails: MovieDetails, movies: Movie[]): void => {
    const similarMoviesContainer =
      movieDetails.querySelector<HTMLDivElement>(".similar-movies-container .movies");
    if (!similarMoviesContainer) return;

    if (movies.length === 0 && similarMoviesContainer.parentElement) {
      similarMoviesContainer.parentElement.style.display = "none"; // Hide the similar movies section
    } else {
      movies.slice(0, 4).forEach((movie) => {
        const similarMovieCard = new MovieCard();
        similarMovieCard.posterPath = movie.poster_path;
        similarMovieCard.title = movie.title;
        similarMovieCard.releaseDate = movie.release_date;
        similarMovieCard.voteAverage = movie.vote_average?.toString();
        similarMovieCard.genreIds = movie.genre_ids.join(",");
        similarMovieCard.overview = movie.overview;
        similarMovieCard.onclick = (event) => {
          event.preventDefault();
          movieService.getMovieDetails(movie.id).then((movieDetails) => {
            this.showMovieDetails(movieDetails);
          });
        }
        similarMoviesContainer.appendChild(similarMovieCard);
      });
    }
  }
  
  fetchSearchResults = async (query: string, page: number) => {
    this.clearErrorMessage();
    try {
      const response = await movieService.searchMovies({ query, page });
      if (page === 1) this.clearResults();
      this.appendMovies(response.results);
    } catch (error) {
      console.error(error);
      this.currentPage--;
      this.showErrorMessage("Error fetching search results");
    } finally {
      this.isFetching = false;
    }
  }

  fetchNowPlaying = async (page: number) => {
    this.clearErrorMessage();
    try {
      const response = await movieService.getNowPlaying({ page });
      if (page === 1) this.clearResults();
      this.appendMovies(response.results);
    } catch (error) {
      console.error(error);
      this.currentPage--;
      this.showErrorMessage("Error fetching now playing");
    } finally {
      this.isFetching = false;
    }
  }
}

export default new App();
