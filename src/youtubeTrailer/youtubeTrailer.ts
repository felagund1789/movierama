import { Trailer } from "../types";
import "./youtubeTrailer.css";

const youtubeBaseURL = import.meta.env.VITE_YOUTUBE_BASE_URL;

export class YoutubeTrailer extends DocumentFragment {
  constructor(trailer: Trailer) {
    super();
    const template = document.querySelector<HTMLTemplateElement>("#youtube-trailer");
    if (!template) throw new Error("Youtube trailer template not found!");

    const youtubeTrailer = document.importNode(template.content, true);
    const trailerFrame = youtubeTrailer.querySelector<HTMLIFrameElement>(".video");
    if (trailerFrame) {
      trailerFrame.src = `${youtubeBaseURL}${trailer.key}`;
    }
    youtubeTrailer.querySelector<HTMLHeadingElement>(".trailer-title")!.textContent = trailer.name;

    return youtubeTrailer;
  }
}
