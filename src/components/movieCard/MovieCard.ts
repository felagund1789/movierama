import { getGenreName } from "../../services/genres";
import { GenreTag } from "../genreTag/GenreTag";
import { VoteAverage } from "../voteAverage/VoteAverage";
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
    this.innerHTML = `<div class="card">
      <a href="">
        <img src="" alt="" title="" class="movie-poster" />
      </a>
      <div class="card-content">
        <a href="" class="movie-title"></a>
        <div class="year-and-score">
          <h3 class="movie-year"></h3>
          <vote-average average="" />
        </div>
        <div class="movie-genres"></div>
        <div class="movie-overview"></div>
      </div>
    </div>`;
  }

  connectedCallback() {
    this.querySelector<HTMLImageElement>(".movie-poster")!.src = this.posterPath ? `${imageBaseURL}${this.posterPath}` : "/poster-placeholder-dark.png";
    this.querySelector<HTMLImageElement>(".movie-poster")!.alt = this.movieTitle!;
    this.querySelector<HTMLImageElement>(".movie-poster")!.title = this.movieTitle!;
    this.querySelector<HTMLHeadingElement>(".movie-title")!.textContent = this.movieTitle || "";
    this.querySelector<HTMLHeadingElement>(".movie-year")!.textContent = this.releaseDate?.split("-")[0] || "";
    this.querySelector<VoteAverage>("vote-average")!.average = this.voteAverage;
    this.genreIds?.split(",")
      .map((genreId: string) => parseInt(genreId))
      .forEach((genreId: number) => {
        const genreElement = new GenreTag();
        genreElement.innerText = getGenreName(genreId);
        this.querySelector<HTMLDivElement>(".movie-genres")!.appendChild(genreElement);
      });
    this.querySelector<HTMLDivElement>(".movie-overview")!.textContent = this.overview || "";
  }
}
