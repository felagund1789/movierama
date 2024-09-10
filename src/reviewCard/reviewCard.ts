import { Review } from "../types";
import "./reviewCard.css";

const imageBaseURL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export class ReviewCard extends HTMLElement {
  review: Review;

  constructor(review: Review) {
    super();
    this.review = review;
  }

  connectedCallback() {
    this.innerHTML = `<div class="review-card">
      <div class="author">
        ${ this.review.author_details.avatar_path &&
          `<img src="${imageBaseURL}${this.review.author_details.avatar_path}" 
            alt="${this.review.author_details.username}" 
            title="${this.review.author_details.username}" 
            class="author-avatar" />` || ""
        }
        <h3 class="author-name">${this.review.author_details.name}</h3>
        <h4 class="author-username">@${this.review.author_details.username}</h4>
      </div>
      <div class="review">
        <div class="review-score">
          <span class="star">${this.fillStar(0)}</span>
          <span class="star">${this.fillStar(1)}</span>
          <span class="star">${this.fillStar(2)}</span>
          <span class="star">${this.fillStar(3)}</span>
          <span class="star">${this.fillStar(4)}</span>
        </div>
        <div class="review-content">
          <a href="${this.review.url}" target="_blank">${this.review.author_details.name || this.review.author_details.username}'s review</a>
          <p>${this.review.content}</p>
        </div>
      </div>
    </div>`;
  };
  
  fillStar = (index: number): string => {
    if (this.review.author_details.rating >= index * 2 + 2) {
      return '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f4b136"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg>';
    } else if (this.review.author_details.rating >= index * 2 + 1) {
      return '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f4b136"><path d="m606-286-33-144 111-96-146-13-58-136v312l126 77ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg>';
    } else {
      return '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f4b136"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/></svg>';
    }
  }
}
