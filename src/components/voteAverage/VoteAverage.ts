import "./VoteAverage.css";

export class VoteAverage extends HTMLElement {

  average: number;

  constructor(average: number) {
    super();
    this.average = average;
  }

  connectedCallback() {
    this.innerHTML = `<h3 class="movie-vote-average ${this.getColor()}">
      ${this.average ? this.average.toFixed(1) : "0.0"}
    </h3>`;
  }

  getColor(): string {
    if (Math.round(this.average * 10) >= 85) {
      return "green";
    } else if (Math.round(this.average * 10) >= 65) {
      return "orange";
    } else {
      return "red";
    }
  }
}
