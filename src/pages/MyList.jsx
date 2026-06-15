import { useEffect, useState } from "react";
import { getList, removeFromList } from "../utils/Storage";
const baseImgUrl = "https://image.tmdb.org/t/p/original";

const MyList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getList());
  }, []);

  const handleRemove = (id) => {
    removeFromList(id);
    setMovies(getList());
  };

  return (
    <div className="pt-24 px-6 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">My List ❤️</h1>

      {movies.length === 0 && (
        <p className="text-gray-400 text-xl">No movies added yet...</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="relative group">
            <img
              src={`${baseImgUrl}${movie.poster_path}`}
              className="rounded-lg hover:scale-105 transition duration-300"
            />

            <button
              onClick={() => handleRemove(movie.id)}
              className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyList;
