import "./VoteAverage.css";

export class VoteAverage extends HTMLElement {

  average: number;

  constructor(average: number) {
    super();
    this.average = average;
  }

  connectedCallback() {
    this.innerHTML = `<h3 class="movie-vote-average ${this.getColor()}">
      ${this.average}
    </h3>`;
  }

  getColor(): string {
    if (this.average >= 8.5) {
      return "green";
    } else if (this.average >= 6.5) {
      return "orange";
    } else {
      return "red";
    }
  }
}
