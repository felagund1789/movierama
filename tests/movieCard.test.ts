// @vitest-environment jsdom

import { describe, expect, it, vitest } from "vitest";
import { MovieCard } from "../src/movieCard/movieCard";
import { Movie } from "../src/types";

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
    const movie: Movie = {
      adult: false,
      backdrop_path: "/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
      genre_ids: [18, 80],
      id: 278,
      original_language: "en",
      original_title: "The Shawshank Redemption",
      overview:
        "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
      popularity: 173.195,
      poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      release_date: "1994-09-23",
      title: "The Shawshank Redemption",
      video: false,
      vote_average: 8.706,
      vote_count: 26764,
    };

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
