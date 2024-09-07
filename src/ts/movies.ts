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

    setMoviePoster(movieCard, movie.poster_path);
    setMovieTitle(movieCard, movie.title);
    setMovieYear(movieCard, movie.release_date);
    setMovieVoteAverage(movieCard, movie.vote_average);
    setMovieGenres(movieCard, movie.genre_ids);
    setMovieOverview(movieCard, movie.overview);

    // Append the movie card to the results list
    results.appendChild(movieCard);
  });
}

/* Helper functions for setting movie card content */
function setMoviePoster(movieCard: DocumentFragment, poster_path: string | null): void {
  const moviePoster =
    movieCard.querySelector<HTMLImageElement>(".movie-poster");
  if (moviePoster) {
    moviePoster.src = poster_path ? `${imageBaseURL}${poster_path}` : "/poster-placeholder-dark.png";
  }
}

function setMovieTitle(movieCard: DocumentFragment, title: string): void {
  const movieTitle =
    movieCard.querySelector<HTMLHeadingElement>(".movie-title");
  if (movieTitle) {
    movieTitle.textContent = title;
  }
}

function setMovieYear(movieCard: DocumentFragment, release_date: string): void {
  const movieYear =
    movieCard.querySelector<HTMLParagraphElement>(".movie-year");
  if (movieYear) {
    movieYear.textContent = release_date.substring(0, 4);
  }
}

function setMovieVoteAverage(movieCard: DocumentFragment, vote_average: number): void {
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

function setMovieGenres(movieCard: DocumentFragment, genre_ids: number[]): void {
  const movieGenre = movieCard.querySelector<HTMLDivElement>(".movie-genres");
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

function setMovieOverview(movieCard: DocumentFragment, overview: string): void {
  const movieOverview =
    movieCard.querySelector<HTMLDivElement>(".movie-overview");
  if (movieOverview) {
    movieOverview.textContent = overview;
  }
}
