// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import app from "../src/app";
import movies from "../src/assets/data/movies.json";

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

function createElement(
  tag: string,
  id: string,
  className: string
): HTMLElement {
  const container = document.createElement(tag);
  container.id = id;
  container.classList.add(className);
  document.body.appendChild(container);
  return container;
}

describe("App tests", () => {
  it("should render a card for each movie", () => {
    const resultsContainer = createElement("div", "results", "results");

    try {
      // Append movies to the results container
      app.appendMovies(movies);
    } catch (error) {
      console.error(error);
    }

    // Check if the movie cards were appended
    const movieCards = resultsContainer.querySelectorAll(".card");
    expect(movieCards.length).toBe(movies.length);
    movies.forEach((movie, index) => {
      const movieCard = movieCards[index];
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

  it("should update the page title with the given string", () => {
    // Create a page title element
    const pageTitle = createElement("h2", "page-title", "page-title");

    // Call the updateResultsPageTitle method
    app.updateResultsPageTitle("Search results");

    // check if the page title was updated
    expect(pageTitle.innerText).toBe("Search results");
  });

  it("should clear the results container", () => {
    // Create a results container
    const resultsContainer = createElement("div", "results", "results");

    // Append a child element to the results container
    resultsContainer.appendChild(document.createElement("div"));

    // Call the clearResults method
    app.clearResults();

    // Check if the results container is empty
    expect(resultsContainer.textContent).toBe("");
  });
});
