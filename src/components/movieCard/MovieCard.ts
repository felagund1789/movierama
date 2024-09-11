import { getGenreName } from "../../services/genres";
import "./MovieCard.css";

const imageBaseURL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export class MovieCard extends HTMLElement {
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
    this.innerHTML = `<div class="card">
      <a href="">
        <img src="${
          this.getAttribute("poster-path")
            ? `${imageBaseURL}${this.getAttribute("poster-path")}`
            : "/poster-placeholder-dark.png"
        }"
          alt="${this.getAttribute("title")}"
          title="${this.getAttribute("title")}"
          class="movie-poster" />
      </a>
      <div class="card-content">
        <a href="" class="movie-title">${this.getAttribute("title")}</a>
        <div class="year-and-score">
          <h3 class="movie-year">${this.getAttribute("release-date")?.substring(0, 4)}</h3>
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
        <div class="movie-overview">${this.getAttribute("overview")}</div>
      </div>
    </div>`;
  }
}
