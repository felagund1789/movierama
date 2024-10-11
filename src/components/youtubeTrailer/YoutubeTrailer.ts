import "./YoutubeTrailer.css";

const youtubeBaseURL = import.meta.env.VITE_YOUTUBE_BASE_URL;

export class YoutubeTrailer extends HTMLElement {

  get trailerKey(): string | null {
    return this.getAttribute("trailerKey");
  }

  set trailerKey(value: string | null) {
    if (value) {
      this.setAttribute("trailerKey", value);
    } else {
      this.removeAttribute("trailerKey");
    }
  }

  get trailerName(): string | null {
    return this.getAttribute("trailerName");
  }

  set trailerName(value: string | null) {
    if (value) {
      this.setAttribute("trailerName", value);
    } else {
      this.removeAttribute("trailerName");
    }
  }

  constructor() {
    super();
    this.innerHTML = `<div class="trailer">
      <iframe class="video" src=""></iframe>
      <h3 class="trailer-title"></h3>
    </div>`;
  }

  connectedCallback() {
    this.querySelector<HTMLIFrameElement>(".video")!.src = `${youtubeBaseURL}${this.getAttribute("trailerKey")}`;
    this.querySelector<HTMLHeadingElement>(".trailer-title")!.textContent = this.getAttribute("trailerName");
  }
}
