import apiClient from "./api-client";
import { appendMovies } from "./movies";

const searchInput = document.querySelector<HTMLInputElement>("#search-input");
let isFetching = true;
let currentPage = 1;

searchInput?.addEventListener(
  "input",
  (event) => {
    const query = (event.target as HTMLInputElement).value.trim();
    if (query.length > 2) {
      isFetching = true;
      currentPage = 1;
      fetchSearchResults(query, currentPage);
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
  const results = document.querySelector("ul.results");
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
