interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const results = document.querySelector("ul.results");
const template = document.querySelector<HTMLTemplateElement>("#movie-card");
const imageBaseURL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export function appendMovies(movies: Movie[]): void {
  if (!template || !results) return;

  movies.forEach((movie) => {
    // Clone the template content for each movie
    const movieCard = document.importNode(template.content, true);

    // Set the movie poster, title, and year
    const moviePoster = movieCard.querySelector<HTMLImageElement>(".movie-poster");
    if (moviePoster) {
      moviePoster.src = `${imageBaseURL}${movie.poster_path}`;
    }
    const movieTitle = movieCard.querySelector<HTMLHeadingElement>(".movie-title");
    if (movieTitle) {
      movieTitle.textContent = movie.title;
    }
    const movieYear = movieCard.querySelector<HTMLParagraphElement>(".movie-year");
    if (movieYear) {
      movieYear.textContent = movie.release_date.substring(0, 4);
    }

    // Append the movie card to the results list
    results.appendChild(movieCard);
  });
}
