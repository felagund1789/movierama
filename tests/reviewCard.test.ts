// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { ReviewCard } from "../src/reviewCard/reviewCard";
import { Review } from "../src/types";

customElements.define("youtube-trailer", ReviewCard);

describe("ReviewCard test", () => {
  it("should render a movie card with correct content", () => {
    // Create a sample review object
    const review: Review = {
      author: "CinemaSerf",
      author_details: {
        name: "CinemaSerf",
        username: "Geronimo1967",
        avatar_path: "/yz2HPme8NPLne0mM8tBnZ5ZWJzf.jpg",
        rating: 6.0,
      },
      content:
        'I really quite enjoyed the first of these (2015) but I struggled a bit to stay engaged with the one. "Riley" is still happily coasting through family life until one day, she embarks on the yellow brick road that is puberty. Towit, her control gallery is no longer the purview of just her lifelong guides like "Fear", "Joy" and "Anger" - now she has also to deal with the likes of disgust, envy, boredom and worst of all - anxiety. It\'s maybe the latter that the film should be called as we now embark on quite a humourless swipe at the culture of validation that young people must navigate. It\'s all about being popular. Being liked. Being the best - in the ice hockey team. Old loyalties go under the bus in favour of new aspirations and yes, much of it does ring quite true as an evaluation of the fickleness in all of us. Thing is, though, there\'s just too much inevitability about what comes next and there\'s way too much incessant dialogue. "Anger" has some fun along the way, and there is the odd comedy one-liner from the laconic "Ennui" but it just didn\'t resonate with me at all. The animation is standard Pixar fayre that does the job colourfully but unremarkably, and by the conclusion I was hoping there was an off button on that great big console. Yep - I\'m probably too old to really appreciate this the way the kids can, but the trick for these studios has to be to engage the adults at the same time as the weans, else out come the mobile phones as our own version of ennui sets in. It\'s fine, but forgettable, sorry.',
      created_at: "2024-06-17T06:27:26.802Z",
      id: "666fd74e159c95894aa651db",
      updated_at: "2024-06-17T06:27:26.904Z",
      url: "https://www.themoviedb.org/review/666fd74e159c95894aa651db",
    };

    // Create a new instance of ReviewCard
    const reviewCard = new ReviewCard(review);
    document.body.appendChild(reviewCard);

    // Assert that the element has been created
    expect(reviewCard).toBeDefined();
    expect(reviewCard.querySelector(".author-name")?.textContent).toBe(review.author_details.name);
    expect(reviewCard.querySelector(".author-username")?.textContent).toBe(`@${review.author_details.username}`);
    expect(reviewCard.querySelector(".review-content")?.textContent).toContain(review.content);
  });
});
