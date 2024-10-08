import "./CreditCard.css";

const imageBaseURL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export class CreditCard extends HTMLElement {
  get profilePhoto(): string | null {
    return this.getAttribute("profile-photo");
  }

  set profilePhoto(value: string | null) {
    if (value) {
      this.setAttribute("profile-photo", value);
    } else {
      this.removeAttribute("profile-photo");
    }
  }

  get creditName(): string | null {
    return this.getAttribute("credit-name");
  }

  set creditName(value: string | null) {
    if (value) {
      this.setAttribute("credit-name", value);
    } else {
      this.removeAttribute("credit-name");
    }
  }

  get creditRole(): string | null {
    return this.getAttribute("credit-role");
  }

  set creditRole(value: string | null) {
    if (value) {
      this.setAttribute("credit-role", value);
    } else {
      this.removeAttribute("credit-role");
    }
  }

  get creditCharacter(): string | null {
    return this.getAttribute("credit-character");
  }

  set creditCharacter(value: string | null) {
    if (value) {
      this.setAttribute("credit-character", value);
    } else {
      this.removeAttribute("credit-character");
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<div class="credit-card">
      ${
        this.getAttribute("profile-photo")
          ? `<img src="${imageBaseURL}${this.getAttribute("profile-photo")}" 
          alt="${this.getAttribute("credit-name")}" 
          title="${this.getAttribute("credit-name")}" 
          class="profile-photo" />`
          : `<div class="profile-photo"></div>`
      }
      <h3 class="credit-name" title="${this.getAttribute(
        "credit-name"
      )}">${this.getAttribute("credit-name")}</h3>
      ${
        this.getAttribute("credit-role")
          ? `<h4 class="credit-role" title="${this.getAttribute(
              "credit-role"
            )}">${this.getAttribute("credit-role")}</h4>`
          : ""
      }
      ${
        this.getAttribute("credit-character")
          ? `<h4 class="credit-character" title="${this.getAttribute(
              "credit-character"
            )}">${this.getAttribute("credit-character")}</h4>`
          : ""
      }
    </div>`;
  }
}
