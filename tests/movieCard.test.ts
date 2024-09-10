// @vitest-environment jsdom

import { describe, expect, it, vitest } from "vitest";
import { MovieCard } from "../src/movieCard/movieCard";
import { Movie } from "../src/types";
import movies from "../src/assets/data/movies.json";
import { GenreTag } from "../src/components/genreTag/genreTag";

customElements.define("genre-tag", GenreTag);

// add a card template to the document
const template = document.createElement("template");
template.id = "movie-card";
template.innerHTML = `
    <div class="card">
      <a href="">
        <img src="" alt="" class="movie-poster" />
      </a>
      <div class="card-content">
        <a href="" class="movie-title"></a>
        <div class="year-and-score">
          <h3 class="movie-year"></h3>
          <h3 class="movie-vote-average"></h3>
        </div>
        <div class="movie-genres"></div>
        <div class="movie-overview"></div>
      </div>
    </div>
  `;
document.body.appendChild(template);

describe("MovieCard test", () => {
  it("should render a movie card with correct content", () => {
    // Create a sample movie object
    const movie: Movie = movies[0];

    // Create a new instance of MovieCard
    const movieCard = new MovieCard(movie, vitest.fn());

    // Assert that the movie card has been created
    expect(movieCard).toBeDefined();
    expect(movieCard.querySelector(".movie-title")?.textContent).toBe(
      movie.title
    );
    expect(movieCard.querySelector(".movie-year")?.textContent).toBe(
      movie.release_date.substring(0, 4)
    ); // year
    expect(movieCard.querySelector(".movie-vote-average")?.textContent).toBe(
      movie.vote_average.toFixed(1)
    );
    expect(movieCard.querySelector(".movie-overview")?.textContent).toBe(
      movie.overview
    );
  });
});
