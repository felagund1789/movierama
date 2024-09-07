import { Movie } from "./api-client";
import { getGenreName } from "./genres";

const imageBaseURL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
const results = document.querySelector("ul.results");
const template = document.querySelector<HTMLTemplateElement>("#movie-card");

export function appendMovies(movies: Movie[]): void {
  if (!template || !results) return;

  movies.forEach((movie) => {
    // Clone the template content for each movie
    const movieCard = document.importNode(template.content, true);

    setMoviePoster(movieCard, movie);
    setMovieTitle(movieCard, movie);
    setMovieYear(movieCard, movie);
    setMovieVoteAverage(movieCard, movie);
    setMovieGenres(movieCard, movie);
    setMovieOverview(movieCard, movie);

    // Append the movie card to the results list
    results.appendChild(movieCard);
  });
}

/* Helper functions for setting movie card content */
function setMoviePoster(movieCard: DocumentFragment, movie: Movie): void {
  const moviePoster =
    movieCard.querySelector<HTMLImageElement>(".movie-poster");
  if (moviePoster) {
    moviePoster.src = `${imageBaseURL}${movie.poster_path}`;
  }
}

function setMovieTitle(movieCard: DocumentFragment, movie: Movie): void {
  const movieTitle =
    movieCard.querySelector<HTMLHeadingElement>(".movie-title");
  if (movieTitle) {
    movieTitle.textContent = movie.title;
  }
}

function setMovieYear(movieCard: DocumentFragment, movie: Movie): void {
  const movieYear =
    movieCard.querySelector<HTMLParagraphElement>(".movie-year");
  if (movieYear) {
    movieYear.textContent = movie.release_date.substring(0, 4);
  }
}

function setMovieVoteAverage(movieCard: DocumentFragment, movie: Movie): void {
  const movieVoteAverage = movieCard.querySelector<HTMLDivElement>(
    ".movie-vote-average"
  );
  if (movieVoteAverage) {
    let color = "green";
    if (movie.vote_average < 8.5) color = "orange";
    if (movie.vote_average < 6.5) color = "red";
    movieVoteAverage.classList.add(color);
    movieVoteAverage.textContent = movie.vote_average.toFixed(1);
  }
}

function setMovieGenres(movieCard: DocumentFragment, movie: Movie): void {
  const movieGenre = movieCard.querySelector<HTMLDivElement>(".movie-genres");
  if (movieGenre) {
    movie.genre_ids
      .map((genreId) => getGenreName(genreId))
      .forEach(
        (genre) =>
          (movieGenre.appendChild(document.createElement("div")).textContent =
            genre)
      );
  }
}

function setMovieOverview(movieCard: DocumentFragment, movie: Movie): void {
  const movieOverview =
    movieCard.querySelector<HTMLDivElement>(".movie-overview");
  if (movieOverview) {
    movieOverview.textContent = movie.overview;
  }
}
