import apiClient from "./api-client";

export async function fetchGenres() {
  const response = await apiClient.getGenres();
  return response.genres;
}

export function getGenreName(genreId: number): string {
  return genres.find((genre) => genre.id === genreId)?.name || "";
}

export const genres = await fetchGenres();
