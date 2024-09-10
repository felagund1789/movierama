import "./GenreTag.css";

export class GenreTag extends HTMLElement {

  genreName: string;

  constructor(average: string) {
    super();
    this.genreName = average;
  }

  connectedCallback() {
    this.innerHTML = `<div class="genre">
      ${this.genreName}
    </div>`;
  }
}
