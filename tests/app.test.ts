// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import app from "../src/app";
import movies from "../src/assets/data/movies.json";

function setupDocument() {
  // reset document body
  document.body.innerHTML = "";
  const resultsContainer = createElement("div", "results", "results");
  const pageTitle = createElement("h2", "page-title", "page-title");
  const searchInput = createElement("input", "search-input", "search");

  return { resultsContainer, pageTitle, searchInput };
}
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
    // Get reference to a results container
    const { resultsContainer } = setupDocument();

    // Append movies to the results container
    app.appendMovies(movies);

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
      expect(movieCard.querySelector(".movie-vote-average")?.textContent).toContain(
        movie.vote_average.toFixed(1)
      );
      expect(movieCard.querySelector(".movie-overview")?.textContent).toBe(
        movie.overview
      );
    });
  });

  it("should update the page title with the given string", () => {
    // Get a reference to a page title element
    const { pageTitle } = setupDocument();

    // check that the page title is NOT "Search results"
    expect(pageTitle.innerText).not.toBe("Search results");

    // Call the updateResultsPageTitle method
    app.updateResultsPageTitle("Search results");

    // check if the page title was updated
    expect(pageTitle.innerText).toBe("Search results");
  });

  it("should clear the results container", () => {
    // Get reference to a results container
    const { resultsContainer } = setupDocument();

    // Append a movie card to the results container
    app.appendMovies(movies.slice(0, 1));

    // Check that the results container is NOT empty
    expect(resultsContainer.textContent).not.toBe("");

    // Call the clearResults method
    app.clearResults();

    // Check if the results container is empty
    expect(resultsContainer.textContent).toBe("");
  });
});
