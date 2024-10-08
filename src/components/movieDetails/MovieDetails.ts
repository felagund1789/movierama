import { getGenreName } from "../../services/genres";
import "./MovieDetails.css";

const imageBaseURL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
const imageFullBaseURL = import.meta.env.VITE_TMDB_IMAGE_FULL_BASE_URL;

export class MovieDetails extends HTMLElement {

  get posterPath(): string | null {
    return this.getAttribute("poster-path");
  }

  set posterPath(value: string | null) {
    if (value) {
      this.setAttribute("poster-path", value);
    } else {
      this.removeAttribute("poster-path");
    }
  }

  get backdropPath(): string | null {
    return this.getAttribute("backdrop-path");
  }

  set backdropPath(value: string | null) {
    if (value) {
      this.setAttribute("backdrop-path", value);
    } else {
      this.removeAttribute("backdrop-path");
    }
  }

  get movieTitle(): string | null {
    return this.getAttribute("title");
  }

  set movieTitle(value: string | null) {
    if (value) {
      this.setAttribute("title", value);
    } else {
      this.removeAttribute("title");
    }
  }

  get releaseDate(): string | null {
    return this.getAttribute("release-date");
  }

  set releaseDate(value: string | null) {
    if (value) {
      this.setAttribute("release-date", value);
    } else {
      this.removeAttribute("release-date");
    }
  }

  get voteAverage(): string | null {
    return this.getAttribute("vote-average");
  }

  set voteAverage(value: string | null) {
    if (value) {
      this.setAttribute("vote-average", value);
    } else {
      this.removeAttribute("vote-average");
    }
  }

  get genreIds(): string | null {
    return this.getAttribute("genre-ids");
  }

  set genreIds(value: string | null) {
    if (value) {
      this.setAttribute("genre-ids", value);
    } else {
      this.removeAttribute("genre-ids");
    }
  }

  get overview(): string | null {
    return this.getAttribute("overview");
  }

  set overview(value: string | null) {
    if (value) {
      this.setAttribute("overview", value);
    } else {
      this.removeAttribute("overview");
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<div class="details" ${
        this.getAttribute("backdrop-path")
          ? `style="background-image: url(${imageFullBaseURL}${this.getAttribute("backdrop-path")})"`
          : ""
      }>
        <button class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
        <div class="details-content">
          <img src="${
            this.getAttribute("poster-path")
              ? `${imageBaseURL}${this.getAttribute("poster-path")}`
              : "/poster-placeholder-dark.png"
          }"
            alt="${this.getAttribute("title")}"
            title="${this.getAttribute("title")}"
            class="movie-poster" />
          <div class="details-text">
            <h2 class="movie-title">${this.getAttribute("title")}</h2>
            <div class="year-and-score">
              <h3 class="movie-year">${this.getAttribute("release-date")?.substring(0, 4) || ""}</h3>
              <vote-average average="${this.getAttribute("vote-average")}" />
            </div>
            <div class="movie-genres">${
              this.getAttribute("genre-ids")
                ? this.getAttribute("genre-ids")!
                    .split(",")
                    .map((id) => getGenreName(parseInt(id)))
                    .map((name) => `<genre-tag>${name}</genre-tag>`)
                    .join("")
                : ""
            }</div>
            <div class="crew-container"></div>
            <div class="cast-container"></div>
            <div class="movie-overview">${this.getAttribute("overview")}</div>
          </div>
        </div>
      </div>
      <div class="trailers-container">
        <h2>Trailers</h2>
        <div class="trailers"></div>
      </div>
      <div class="reviews-container">
        <h2>Reviews</h2>
        <div class="reviews"></div>
      </div>
      <div class="similar-movies-container">
        <h2>Similar movies</h2>
        <div class="movies"></div>
      </div>`;
  }
}
