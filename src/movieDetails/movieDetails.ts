import apiClient from "../services/api-client";
import { getGenreName } from "../services/genres";
import { Movie } from "../types";
import "./movieDetails.css";

const imageBaseURL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
const imageFullBaseURL = import.meta.env.VITE_TMDB_IMAGE_FULL_BASE_URL;

export class MovieDetails extends DocumentFragment {
  constructor(movie: Movie) {
    super();
    const template = document.querySelector<HTMLTemplateElement>("#movie-details");
    if (!template) throw new Error("Movie details template not found!");

    const movieDetails = document.importNode(template.content, true);

    setMovieBackdrop(movieDetails, movie.backdrop_path);
    setMoviePoster(movieDetails, movie);
    setMovieTitle(movieDetails, movie.title);
    setMovieYear(movieDetails, movie.release_date);
    setMovieVoteAverage(movieDetails, movie.vote_average);
    setMovieGenres(movieDetails, movie.genre_ids);
    setMovieOverview(movieDetails, movie.overview);

    apiClient.getMovieTrailers(movie.id).then((response) => {
      console.log(response.results);
    });

    apiClient.getMovieReviews(movie.id).then((response) => {
      console.log(response.results);
    });

    apiClient.getSimilarMovies(movie.id).then((response) => {
      console.log(response.results);
    });

    return movieDetails;
  }
}

/* Helper functions for setting movie card content */
function setMovieBackdrop(movieDetails: DocumentFragment, backdrop_path: string): void {
  const detailsBody =
    movieDetails.querySelector<HTMLDivElement>(".details");
  if (detailsBody && backdrop_path) {
    detailsBody.style.backgroundImage = `url(${imageFullBaseURL}${backdrop_path})`;
  }
}

function setMoviePoster(movieDetails: DocumentFragment, movie: Movie): void {
  const moviePoster =
    movieDetails.querySelector<HTMLImageElement>(".movie-poster");
  if (moviePoster) {
    moviePoster.src = movie.poster_path
      ? `${imageBaseURL}${movie.poster_path}`
      : "/poster-placeholder-dark.png";
    moviePoster.alt = movie.title;
    moviePoster.title = movie.title;
  }
}

function setMovieTitle(movieDetails: DocumentFragment, title: string): void {
  const movieTitle =
    movieDetails.querySelector<HTMLHeadingElement>(".movie-title");
  if (movieTitle) {
    movieTitle.textContent = title;
  }
}

function setMovieYear(movieDetails: DocumentFragment, release_date: string): void {
  const movieYear =
    movieDetails.querySelector<HTMLParagraphElement>(".movie-year");
  if (movieYear) {
    movieYear.textContent = release_date.substring(0, 4);
  }
}

function setMovieVoteAverage(
  movieDetails: DocumentFragment,
  vote_average: number
): void {
  const movieVoteAverage = movieDetails.querySelector<HTMLDivElement>(
    ".movie-vote-average"
  );
  if (movieVoteAverage) {
    let color = "green";
    if (vote_average < 8.5) color = "orange";
    if (vote_average < 6.5) color = "red";
    movieVoteAverage.classList.add(color);
    movieVoteAverage.textContent = vote_average.toFixed(1);
  }
}

function setMovieGenres(
  movieDetails: DocumentFragment,
  genre_ids: number[]
): void {
  const movieGenre = movieDetails.querySelector<HTMLDivElement>(".movie-genres");
  if (movieGenre) {
    genre_ids
      .map((genreId) => getGenreName(genreId))
      .forEach(
        (genre) =>
          (movieGenre.appendChild(document.createElement("div")).textContent =
            genre)
      );
  }
}

function setMovieOverview(movieDetails: DocumentFragment, overview: string): void {
  const movieOverview =
    movieDetails.querySelector<HTMLDivElement>(".movie-overview");
  if (movieOverview) {
    movieOverview.textContent = overview;
  }
}
