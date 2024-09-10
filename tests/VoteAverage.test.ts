// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { VoteAverage } from "../src/components/voteAverage/VoteAverage";

customElements.define("vote-average", VoteAverage);

describe("VoteAverage test", () => {
  it("should have .red class if average is < 6.5", () => {

    // Create a new instance of VoteAverage
    const voteaverageTag = new VoteAverage(5);
    document.body.appendChild(voteaverageTag);

    // Assert that the element has been created
    expect(voteaverageTag).toBeDefined();
    expect(voteaverageTag.querySelector(".movie-vote-average")?.textContent?.trim()).toBe(Number(5).toFixed(1));
    expect(voteaverageTag.querySelector(".movie-vote-average")?.classList).toContain("red");
  });

  it("should have .orange class if average is >= 6.5 and < 8.5", () => {

    // Create a new instance of VoteAverage
    const voteaverageTag = new VoteAverage(7);
    document.body.appendChild(voteaverageTag);

    // Assert that the element has been created
    expect(voteaverageTag).toBeDefined();
    expect(voteaverageTag.querySelector(".movie-vote-average")?.textContent?.trim()).toBe(Number(7).toFixed(1));
    expect(voteaverageTag.querySelector(".movie-vote-average")?.classList).toContain("orange");
  });

  it("should have .green class if average is >= 8.5", () => {

    // Create a new instance of VoteAverage
    const voteaverageTag = new VoteAverage(8.5);
    document.body.appendChild(voteaverageTag);

    // Assert that the element has been created
    expect(voteaverageTag).toBeDefined();
    expect(voteaverageTag.querySelector(".movie-vote-average")?.textContent?.trim()).toBe(Number(8.5).toFixed(1));
    expect(voteaverageTag.querySelector(".movie-vote-average")?.classList).toContain("green");
  });
});
