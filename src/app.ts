import "./app.css";
import { MovieCard } from "./movieCard/movieCard";
import apiClient from "./services/api-client";
import { Movie } from "./types";

class App {

  isFetching = true;
  currentPage = 1;

  constructor() {
    this.setupListeners();
    this.fetchNowPlaying(this.currentPage);
  }

  setupListeners = () => {
    const searchInput = document.querySelector<HTMLInputElement>("#search-input");

    searchInput?.addEventListener(
      "input",
      (event) => {
        const query = (event.target as HTMLInputElement).value.trim();
        if (query.length > 0) {
          this.isFetching = true;
          this.currentPage = 1;
          this.fetchSearchResults(query, this.currentPage);
          this.updateResultsPageTitle(`Search results for "${query}"`);
        } else {
          this.isFetching = true;
          this.currentPage = 1;
          this.fetchNowPlaying(this.currentPage);
          this.updateResultsPageTitle("In Theaters");
        }
      },
      { passive: true }
    );

    window.addEventListener("scroll", async () => {
      // Do not run if currently fetching
      if (this.isFetching) return;

      // Scrolled to bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const searchValue = searchInput?.value.trim() || "";
        searchValue === ""
          ? this.fetchNowPlaying(++this.currentPage)
          : this.fetchSearchResults(searchValue, ++this.currentPage);
      }
    });
  }

  updateResultsPageTitle = (title: string): void => {
    const pageTitle = document.querySelector<HTMLHeadingElement>("#page-title");
    if (pageTitle) {
      pageTitle.innerText = title;
    }
  }

  clearResults = (): void => {
    const results = document.querySelector<HTMLDivElement>("div.results");
    if (results) {
      results.innerHTML = "";
    }
  }

  appendMovies = (movies: Movie[]): void => {
    const results = document.querySelector<HTMLDivElement>("div.results");
    if (!results) throw new Error("Results container not found");
    
    movies.forEach((movie) => {
      const movieCard = new MovieCard(movie);
  
      // Append the movie card to the results list
      results.appendChild(movieCard);
    });
  }
  
  fetchSearchResults = async (query: string, page: number) => {
    const response = await apiClient.searchMovies({ query, page });
    if (page === 1) this.clearResults();
    this.appendMovies(response.results);
    this.isFetching = false;
  }

  fetchNowPlaying = async (page: number) => {
    const response = await apiClient.getNowPlaying({ page });
    if (page === 1) this.clearResults();
    this.appendMovies(response.results);
    this.isFetching = false;
  }
}

export default new App();
