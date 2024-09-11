// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import movies from "../src/assets/data/movies.json";
import { GenreTag } from "../src/components/genreTag/GenreTag";
import { MovieCard } from "../src/components/movieCard/movieCard";
import { VoteAverage } from "../src/components/voteAverage/VoteAverage";
import { Movie } from "../src/types";

customElements.define("genre-tag", GenreTag);
customElements.define("vote-average", VoteAverage);
customElements.define("movie-card", MovieCard);

describe("MovieCard test", () => {
  it("should render a movie card with correct content", () => {
    // Create a sample movie object
    const movie: Movie = movies[0];

    // Create a new instance of MovieCard
    const movieCard = new MovieCard();
    movieCard.posterPath = movie.poster_path;
    movieCard.title = movie.title;
    movieCard.releaseDate = movie.release_date;
    movieCard.voteAverage = movie.vote_average.toString();
    movieCard.genreIds = movie.genre_ids.join(",");
    movieCard.overview = movie.overview;
    document.body.appendChild(movieCard);

    // Assert that the movie card has been created
    expect(movieCard).toBeDefined();
    expect(movieCard.querySelector(".movie-title")?.textContent).toBe(movie.title);
    expect(movieCard.querySelector(".movie-year")?.textContent).toBe(movie.release_date.substring(0, 4)); // year
    expect(movieCard.querySelector(".movie-vote-average")?.textContent?.trim()).toBe(movie.vote_average.toFixed(1));
    expect(movieCard.querySelector(".movie-overview")?.textContent).toBe(movie.overview);
  });
});
