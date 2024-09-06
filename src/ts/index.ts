import apiClient from "./api-client";
import { appendMovies } from "./movies";

let isFetching = true;
let currentPage = 1;

function fetchNowPlaying(page: number): void {
  apiClient
    .getNowPlaying({ page })
    .then((response) => {
      appendMovies(response.results);
    })
    .finally(() => {
      isFetching = false;
    });
}

fetchNowPlaying(currentPage);

window.addEventListener("scroll", async () => {
  // Do not run if currently fetching
  if (isFetching) return;

  // Scrolled to bottom
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    fetchNowPlaying(++currentPage);
  }
});
