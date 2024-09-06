import apiClient from "./api-client";

const response = await apiClient.getGenres();
const genres = response.genres;

export default genres;

export function getGenreName(genreId: number): string {
  return genres.find((genre) => genre.id === genreId)?.name || "";
}
