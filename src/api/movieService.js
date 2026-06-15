import { tmdb } from "./api";

export const getTrailerKey = async (movieId) => {
  const res = await tmdb.get(`/movie/${movieId}/videos`);
  const trailer = res.data.results.find(v => v.type === "Trailer" && v.site === "YouTube");
  return trailer?.key || null;
};
