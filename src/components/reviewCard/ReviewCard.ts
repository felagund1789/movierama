import "./ReviewCard.css";

const imageBaseURL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export class ReviewCard extends HTMLElement {
  get authorAvatar(): string | null {
    return this.getAttribute("author-avatar");
  }

  set authorAvatar(value: string | null) {
    if (value) {
      this.setAttribute("author-avatar", value);
    } else {
      this.removeAttribute("author-avatar");
    }
  }

  get authorName(): string | null {
    return this.getAttribute("author-name");
  }

  set authorName(value: string | null) {
    if (value) {
      this.setAttribute("author-name", value);
    } else {
      this.removeAttribute("author-name");
    }
  }

  get authorUsername(): string | null {
    return this.getAttribute("author-username");
  }

  set authorUsername(value: string | null) {
    if (value) {
      this.setAttribute("author-username", value);
    } else {
      this.removeAttribute("author-username");
    }
  }

  get rating(): string | null {
    return this.getAttribute("rating");
  }

  set rating(value: string | null) {
    if (value) {
      this.setAttribute("rating", value);
    } else {
      this.removeAttribute("rating");
    }
  }

  get content(): string | null {
    return this.getAttribute("content");
  }

  set content(value: string | null) {
    if (value) {
      this.setAttribute("content", value);
    } else {
      this.removeAttribute("content");
    }
  }

  get reviewUrl(): string | null {
    return this.getAttribute("review-url");
  }

  set reviewUrl(value: string | null) {
    if (value) {
      this.setAttribute("review-url", value);
    } else {
      this.removeAttribute("review-url");
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<div class="review-card">
      <div class="author">
        ${
          (this.getAttribute("author-avatar") &&
            `<img src="${imageBaseURL}${this.getAttribute("author-avatar")}" 
            alt="${this.getAttribute("author-username")}" 
            title="${this.getAttribute("author-username")}" 
            class="author-avatar" />`) ||
          ""
        }
        ${
          this.getAttribute("author-name")
            ? `<h3 class="author-name">${this.getAttribute("author-name")}</h3>`
            : ""
        }
        <h4 class="author-username">@${this.getAttribute(
          "author-username"
        )}</h4>
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
          <a href="${this.getAttribute("review-url")}" target="_blank">${
      this.getAttribute("author-name") || this.getAttribute("author-username")
    }'s review</a>
          <p>${this.getAttribute("content")}</p>
        </div>
      </div>
    </div>`;
  }

  fillStar = (index: number): string => {
    if (parseInt(this.getAttribute("rating") || "0") >= index * 2 + 2) {
      return '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f4b136"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg>';
    } else if (parseInt(this.getAttribute("rating") || "0") >= index * 2 + 1) {
      return '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f4b136"><path d="m606-286-33-144 111-96-146-13-58-136v312l126 77ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg>';
    } else {
      return '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f4b136"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/></svg>';
    }
  };
}
