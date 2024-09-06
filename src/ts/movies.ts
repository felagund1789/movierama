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

    // Set the movie poster
    const moviePoster = movieCard.querySelector<HTMLImageElement>(".movie-poster");
    if (moviePoster) {
      moviePoster.src = `${imageBaseURL}${movie.poster_path}`;
    }
    // Set the movie title
    const movieTitle = movieCard.querySelector<HTMLHeadingElement>(".movie-title");
    if (movieTitle) {
      movieTitle.textContent = movie.title;
    }
    // Set the movie year
    const movieYear = movieCard.querySelector<HTMLParagraphElement>(".movie-year");
    if (movieYear) {
      movieYear.textContent = movie.release_date.substring(0, 4);
    }
    // Set the movie vote average
    const movieVoteAverage = movieCard.querySelector<HTMLDivElement>(".movie-vote-average");
    if (movieVoteAverage) {
      let color = "green";
      if (movie.vote_average < 8.5) color = "orange";
      if (movie.vote_average < 6.5) color = "red";
      movieVoteAverage.classList.add(color);
      movieVoteAverage.textContent = movie.vote_average.toFixed(1);
    }
    // Set the movie genres
    const movieGenre = movieCard.querySelector<HTMLDivElement>(".movie-genres");
    if (movieGenre) {
      movie.genre_ids.forEach((genreId) => movieGenre.appendChild(document.createElement("div")).textContent = genreId.toString());
    }
    // Set the movie overview
    const movieOverview = movieCard.querySelector<HTMLDivElement>(".movie-overview");
    if (movieOverview) {
      movieOverview.textContent = movie.overview;
    }

    // Append the movie card to the results list
    results.appendChild(movieCard);
  });
}
