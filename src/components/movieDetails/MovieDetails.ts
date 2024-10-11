import { GenreTag } from "../genreTag/GenreTag";
import { ImdbTag } from "../imdbTag/ImdbTag";
import { VoteAverage } from "../voteAverage/VoteAverage";
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

  get runtime(): string | null {
    return this.getAttribute("runtime");
  }

  set runtime(value: string | null) {
    if (value) {
      this.setAttribute("runtime", value);
    } else {
      this.removeAttribute("runtime");
    }
  }

  get imdbId(): string | null {
    return this.getAttribute("imdb-id");
  }

  set imdbId(value: string | null) {
    if (value) {
      this.setAttribute("imdb-id", value);
    } else {
      this.removeAttribute("imdb-id");
    }
  }

  get genres(): string | null {
    return this.getAttribute("genres");
  }

  set genres(value: string | null) {
    if (value) {
      this.setAttribute("genres", value);
    } else {
      this.removeAttribute("genres");
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
    this.innerHTML = `<div class="details">
        <button class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
        <div class="details-content">
          <img src="" alt="" title="" class="movie-poster" />
          <div class="details-text">
            <h2 class="movie-title"></h2>
            <div class="year-and-score">
              <h3 class="movie-year"></h3> • 
              <h3 class="duration"></h3> • 
              <imdb-tag></imdb-tag> • 
              <vote-average />
            </div>
            <div class="movie-genres"></div>
            <div class="movie-overview"></div>
            <div class="crew-container"></div>
            <div class="cast-container"></div>
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

  connectedCallback() {
    this.querySelector<HTMLDivElement>(".details")!.style.backgroundImage = `url(${imageFullBaseURL}${this.backdropPath})`;
    this.querySelector<HTMLImageElement>(".movie-poster")!.src = `${imageBaseURL}${this.posterPath}`;
    this.querySelector<HTMLImageElement>(".movie-poster")!.alt = this.movieTitle || "";
    this.querySelector<HTMLImageElement>(".movie-poster")!.title = this.movieTitle || "";
    this.querySelector<HTMLHeadingElement>(".movie-title")!.textContent = this.movieTitle || "";
    this.querySelector<HTMLHeadingElement>(".movie-year")!.textContent = this.releaseDate?.split("-")[0] || "";
    this.querySelector<HTMLHeadingElement>(".duration")!.textContent = this.convertMinutesToHoursAndMinutes(this.runtime);
    this.querySelector<VoteAverage>("vote-average")!.average = this.voteAverage;
    this.querySelector<ImdbTag>("imdb-tag")!.imdbId = this.imdbId;
    this.genres?.split(",").forEach((genre: string) => {
      const genreElement = new GenreTag();
      genreElement.innerText = genre;
      this.querySelector<HTMLDivElement>(".movie-genres")!.appendChild(genreElement);
    });
    this.querySelector<HTMLDivElement>(".movie-overview")!.textContent = this.overview || "";
  }

  convertMinutesToHoursAndMinutes = (input: string | null): string => {
    if (!input) return "";
    
    const minutes = parseInt(input);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
}
