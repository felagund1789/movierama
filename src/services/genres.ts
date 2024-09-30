import genreService from "./genreService";

export const genres = (await genreService.fetchGenres()).genres;

export function getGenreName(genreId: number): string {
  return genres.find((genre) => genre.id === genreId)?.name || "";
}
