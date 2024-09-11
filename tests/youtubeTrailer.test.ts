// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { YoutubeTrailer } from "../src/components/youtubeTrailer/youtubeTrailer";
import { Trailer } from "../src/types";

customElements.define("youtube-trailer", YoutubeTrailer);

describe("YoutubeTrailer test", () => {
  it("should render a YouTube trailer custom element with correct content", () => {
    // Create a sample trailer object
    const trailer: Trailer = {
      id: "665f511e176dc873953843e5",
      key: "L4DrolmDxmw",
      name: "Final Trailer",
      official: true,
      published_at: "2024-06-04T16:00:17.000Z",
      site: "YouTube",
      size: 1080,
      type: "Trailer",
    };

    // Create a new instance of YoutubeTrailer
    const youtubeTrailer = new YoutubeTrailer();
    youtubeTrailer.trailerKey = trailer.key;
    youtubeTrailer.trailerName = trailer.name;
    document.body.appendChild(youtubeTrailer);

    // Assert that the element has been created
    expect(youtubeTrailer).toBeDefined();
    expect(youtubeTrailer.querySelector<HTMLIFrameElement>(".video")?.src).toContain(trailer.key);
    expect(youtubeTrailer.querySelector<HTMLHeadingElement>(".trailer-title")?.textContent).toBe(trailer.name);
  });
});
