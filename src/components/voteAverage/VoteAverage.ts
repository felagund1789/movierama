import "./VoteAverage.css";

export class VoteAverage extends HTMLElement {

  get average(): string | null {
    return this.getAttribute("average");
  }

  set average(value: string | null) {
    if (value) {
      this.setAttribute("average", value);
    } else {
      this.removeAttribute("average");
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<h3 class="movie-vote-average ${this.getColor()}">
      ${this.average ? parseFloat(this.average).toFixed(1) : "0.0"}
    </h3>`;
  }

  getColor(): string {
    if (!this.average) return "red";
    if (Math.round(parseFloat(this.average) * 10) >= 85) {
      return "green";
    } else if (Math.round(parseFloat(this.average) * 10) >= 65) {
      return "orange";
    } else {
      return "red";
    }
  }
}
