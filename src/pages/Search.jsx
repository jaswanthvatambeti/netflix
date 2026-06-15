import { useState } from "react";
import axios from "../api/axios";

const baseImgUrl = "https://image.tmdb.org/t/p/w500";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function searchMovie(e) {
    setQuery(e.target.value);

    if (e.target.value.length < 2) return setResults([]);

    try {
      const res = await axios.get(`/search/movie`, {
        params: { query: e.target.value }
      });
      setResults(res.data.results);
    } catch (err) {
      console.log("Search error:", err);
    }
  }

  return (
    <div className="bg-black min-h-screen text-white px-6 pt-24">
      <h1 className="text-3xl font-bold">Search Movies</h1>

      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={searchMovie}
        placeholder="Search for movies..."
        className="w-full bg-gray-800 text-white p-3 mt-4 rounded-lg outline-none"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-8">
        {results.map((movie) => (
          <img
            key={movie.id}
            src={`${baseImgUrl}${movie.poster_path}`}
            className="rounded-lg hover:scale-105 duration-300 cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}
