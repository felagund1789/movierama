import apiClient from "./api-client";
import { appendMovies } from "./movies";

const pageTitle = document.querySelector<HTMLHeadingElement>("#page-title");
const searchInput = document.querySelector<HTMLInputElement>("#search-input");
const results = document.querySelector<HTMLDivElement>("div.results");

let isFetching = true;
let currentPage = 1;

searchInput?.addEventListener(
  "input",
  (event) => {
    const query = (event.target as HTMLInputElement).value.trim();
    if (query.length > 0) {
      isFetching = true;
      currentPage = 1;
      fetchSearchResults(query, currentPage);
      if (pageTitle) {
        pageTitle.innerText = `Search results for "${query}"`;
      }
    } else {
      isFetching = true;
      currentPage = 1;
      fetchNowPlaying(currentPage);
      if (pageTitle) {
        pageTitle.innerText = "In Theaters";
      }
    }
  },
  { passive: true }
);

window.addEventListener("scroll", async () => {
  // Do not run if currently fetching
  if (isFetching) return;

  // Scrolled to bottom
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    const searchValue = searchInput?.value.trim() || "";
    searchValue === ""
      ? fetchNowPlaying(++currentPage)
      : fetchSearchResults(searchValue, ++currentPage);
  }
});

function clearResults(): void {
  if (results) {
    results.innerHTML = "";
  }
}

function fetchSearchResults(query: string, page: number): void {
  apiClient
    .searchMovies({ query, page })
    .then((response) => {
      if (page === 1) {
        clearResults();
      }
      appendMovies(response.results);
    })
    .finally(() => {
      isFetching = false;
    });
}

function fetchNowPlaying(page: number): void {
  apiClient
    .getNowPlaying({ page })
    .then((response) => {
      if (page === 1) {
        clearResults();
      }
      appendMovies(response.results);
    })
    .finally(() => {
      isFetching = false;
    });
}

fetchNowPlaying(currentPage);
