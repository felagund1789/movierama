import { GenreTag } from "../components/genreTag/genreTag";
import { getGenreName } from "../services/genres";
import { Movie } from "../types";
import "./movieCard.css";

const imageBaseURL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export class MovieCard extends DocumentFragment {
  constructor(movie: Movie, onClickHandler: (event: Event) => void) {
    super();
    const template = document.querySelector<HTMLTemplateElement>("#movie-card");
    if (!template) throw new Error("Movie template not found!");

    const movieCard = document.importNode(template.content, true);

    setMoviePoster(movieCard, movie);
    setMovieTitle(movieCard, movie);
    setMovieYear(movieCard, movie.release_date);
    setMovieVoteAverage(movieCard, movie.vote_average);
    setMovieGenres(movieCard, movie.genre_ids);
    setMovieOverview(movieCard, movie.overview);

    movieCard
      .querySelector(".movie-title")
      ?.addEventListener("click", onClickHandler);
    movieCard
      .querySelector(".movie-poster")
      ?.addEventListener("click", onClickHandler);

    return movieCard;
  }
}

/* Helper functions for setting movie card content */
function setMoviePoster(movieCard: DocumentFragment, movie: Movie): void {
  const moviePoster =
    movieCard.querySelector<HTMLImageElement>(".movie-poster");
  if (moviePoster) {
    moviePoster.src = movie.poster_path
      ? `${imageBaseURL}${movie.poster_path}`
      : "/poster-placeholder-dark.png";
    moviePoster.alt = movie.title;
    moviePoster.title = movie.title;
  }
}

function setMovieTitle(movieCard: DocumentFragment, movie: Movie): void {
  const movieTitle =
    movieCard.querySelector<HTMLHeadingElement>(".movie-title");
  if (movieTitle) {
    movieTitle.textContent = movie.title;
  }
}

function setMovieYear(movieCard: DocumentFragment, release_date: string): void {
  const movieYear =
    movieCard.querySelector<HTMLParagraphElement>(".movie-year");
  if (movieYear) {
    movieYear.textContent = release_date.substring(0, 4);
  }
}

function setMovieVoteAverage(
  movieCard: DocumentFragment,
  vote_average: number
): void {
  const movieVoteAverage = movieCard.querySelector<HTMLDivElement>(
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
  movieCard: DocumentFragment,
  genre_ids: number[]
): void {
  const movieGenre = movieCard.querySelector<HTMLDivElement>(".movie-genres");
  if (movieGenre) {
    genre_ids
      .map((genreId) => getGenreName(genreId))
      .forEach((genre) => movieGenre.appendChild(new GenreTag(genre)));
  }
}

function setMovieOverview(movieCard: DocumentFragment, overview: string): void {
  const movieOverview =
    movieCard.querySelector<HTMLDivElement>(".movie-overview");
  if (movieOverview) {
    movieOverview.textContent = overview;
  }
}
