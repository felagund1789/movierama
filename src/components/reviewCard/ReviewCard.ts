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
    this.innerHTML = `<div class="review-card">
      <div class="author">
        <img src="" alt="" title="" class="author-avatar" />
        <h3 class="author-name"></h3>
        <h4 class="author-username"></h4>
      </div>
      <div class="review">
        <div class="review-score">
          <span class="star"></span>
          <span class="star"></span>
          <span class="star"></span>
          <span class="star"></span>
          <span class="star"></span>
        </div>
        <div class="review-content">
          <a href="" target="_blank"></a>
          <p></p>
        </div>
      </div>
    </div>`;
  }

  connectedCallback() {
    const avatarPath = this.getAttribute("author-avatar");
    const name = this.getAttribute("author-name");
    const username = this.getAttribute("author-username");
    const rating = this.getAttribute("rating");
    const content = this.getAttribute("content");

    const authorAvatar = this.querySelector<HTMLImageElement>(".author .author-avatar");
    if (authorAvatar && avatarPath) {
      authorAvatar.src = imageBaseURL + avatarPath;
      authorAvatar.title = username ?? "";
      authorAvatar.alt = username ?? ";"
    } else {
      authorAvatar?.remove();
    }

    const authorName = this.querySelector<HTMLHeadingElement>(".author .author-name");
    if (authorName && name) {
      authorName.innerText = name ?? "";
    } else {
      authorName?.remove();
    }

    const authorUsername = this.querySelector<HTMLHeadingElement>(".author .author-username");
    if (authorUsername && username) {
      authorUsername.innerText = `@${username}` ?? "";
    } else {
      authorUsername?.remove();
    }

    const reviewStars = this.querySelectorAll<HTMLSpanElement>(".review .review-score .star");
    if (reviewStars && rating) {
      reviewStars.forEach((span, index) => {
        span.innerHTML = this.fillStar(index);
      });
    }

    const reviewTitle = this.querySelector<HTMLAnchorElement>(".review .review-content a");
    if (reviewTitle) {
      reviewTitle.href = this.getAttribute("review-url") ?? "";
      reviewTitle.innerText = `${name || username}'s review`;
    }

    const reviewContent = this.querySelector<HTMLParagraphElement>(".review .review-content p");
    if (reviewContent && content) {
      reviewContent.innerText = content;
    }
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
