import { Trailer } from "../types";
import "./youtubeTrailer.css";

const youtubeBaseURL = import.meta.env.VITE_YOUTUBE_BASE_URL;

export class YoutubeTrailer extends HTMLElement {

  trailer: Trailer;

  constructor(trailer: Trailer) {
    super();
    this.trailer = trailer;
  }

  connectedCallback() {
    this.innerHTML = `<div class="trailer">
      <iframe class="video" src="${youtubeBaseURL}${this.trailer.key}"></iframe>
      <h3 class="trailer-title">${this.trailer.name}</h3>
    </div>`;
  }
}
