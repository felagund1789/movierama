import { Review } from "../types";
import "./reviewCard.css";

const imageBaseURL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export class ReviewCard extends DocumentFragment {
  constructor(review: Review) {
    super();
    const template =
      document.querySelector<HTMLTemplateElement>("#review-card");
    if (!template) throw new Error("Review card template not found!");

    const reviewCard = document.importNode(template.content, true);

    setAuthor(reviewCard, review);
    setReviewScore(reviewCard, review.author_details.rating);
    setReviewContent(reviewCard, review);

    return reviewCard;
  }
}

/* Helper functions for setting movie card content */
function setAuthor(reviewCard: DocumentFragment, review: Review): void {
  const authorDetails = reviewCard.querySelector<HTMLImageElement>(".author");
  if (!authorDetails) return;

  const authorAvatar =
    reviewCard.querySelector<HTMLImageElement>(".author-avatar");
  if (authorAvatar && review.author_details.avatar_path) {
    authorAvatar.src = `${imageBaseURL}${review.author_details.avatar_path}`;
    authorAvatar.alt = review.author_details.name;
    authorAvatar.title = review.author_details.name;
  } else if (authorAvatar) {
    authorAvatar.style.display = "none";
  }

  const authorName =
    reviewCard.querySelector<HTMLHeadingElement>(".author-name");
  if (authorName) {
    authorName.textContent = review.author_details.name;
  }

  const authorUsername =
    reviewCard.querySelector<HTMLHeadingElement>(".author-username");
  if (authorUsername) {
    authorUsername.textContent = `@${review.author_details.username}`;
  }
}

function setReviewScore(reviewCard: DocumentFragment, rating: number): void {
  const reviewScore =
    reviewCard.querySelector<HTMLHeadingElement>(".review-score");
  // draw 5 stars, each representing 2 points
  if (reviewScore) {
    const stars = reviewScore.querySelectorAll("span.star");
    stars.forEach((star, index) => {
      if (rating >= index * 2 + 2) {
        star.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f4b136"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg>';
      } else if (rating >= index * 2 + 1) {
        star.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f4b136"><path d="m606-286-33-144 111-96-146-13-58-136v312l126 77ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg>';
      } else {
        star.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f4b136"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/></svg>';
      }
    });
  }
}

function setReviewContent(reviewCard: DocumentFragment, review: Review): void {
  const reviewContent =
    reviewCard.querySelector<HTMLDivElement>(".review-content");
  if (reviewContent) {
    reviewContent.innerHTML = `<a href="${review.url}" target="_blank">${
      review.author_details.name || review.author_details.username
    }'s review</a><p>${review.content}</p>`;
  }
}
