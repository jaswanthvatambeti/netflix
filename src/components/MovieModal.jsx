import React from "react";
import TrailerPlayer from "./TrailerPlayer";

const MovieModal = ({ movie, onClose }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  {showTrailer && (
  <TrailerPlayer movieId={movie.id} onClose={() => setShowTrailer(false)} />
)}


  if (!movie) return null;

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Slide-Up Modal */}
      <div className="
        fixed bottom-0 left-0 right-0 
        bg-zinc-900 text-white p-6 rounded-t-2xl z-50
        animate-slideUp
      ">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {movie.title || movie.name || movie.original_name}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-300 hover:text-white"
          >
            ×
          </button>
          <button
  onClick={() => setPlayTrailer(true)}
  className="bg-red-600 px-4 py-2 rounded mt-4 hover:bg-red-700"
>
  ▶ Play Trailer
</button>
{showTrailer && (
  <TrailerPlayer movieId={movie.id} onClose={() => setShowTrailer(false)} />
)}

        </div>

        <p className="mt-2 text-gray-300">
          {movie.overview || "No description available."}
        </p>

        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            className="w-full mt-4 rounded-lg"
          />
        )}
      </div>
    </>
  );
};

export default MovieModal;
