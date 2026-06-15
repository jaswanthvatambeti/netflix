import { useState, useEffect } from "react";
import axios from "../api/axios";
import YouTube from "react-youtube";
import "./Row.css";

const baseURL = "https://image.tmdb.org/t/p/w300";

export default function Row({ title, fetchUrl, isLarge }) {
  const [movies, setMovies] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [trailerKeys, setTrailerKeys] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(fetchUrl);
        setMovies(res.data.results);
      } catch (err) {
        console.log("Error loading movies:", err);
      }
    };
    load();
  }, [fetchUrl]);

  const fetchTrailer = async (movie) => {
    if (!movie || trailerKeys[movie.id]) return;

    try {
      const res = await axios.get(`/movie/${movie.id}/videos`);
      const trailer = res.data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      
      if (trailer) {
        setTrailerKeys(prev => ({
          ...prev,
          [movie.id]: trailer.key
        }));
      }
    } catch (err) {
      console.log("Trailer fetch error:", err);
    }
  };

  const handleMouseEnter = (movie) => {
    setHoveredMovie(movie.id);
    fetchTrailer(movie);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };

  const youtubeOpts = {
    height: "180",
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      modestbranding: 1,
      rel: 0,
      controls: 0,
      loop: 1,
      playsinline: 1
    },
  };

  return (
    <div className={`row ${isLarge ? 'large-row' : ''}`}>
      <h2>{title}</h2>

      <div className="row-container">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`movie-card ${hoveredMovie === movie.id ? "hovered" : ""}`}
            onMouseEnter={() => handleMouseEnter(movie)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="poster"
              src={`${baseURL}${isLarge ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.title || movie.name}
              onError={(e) => {
                e.target.src = '/images/placeholder.jpg';
              }}
            />

            {hoveredMovie === movie.id && (
              <div className="hover-preview">
                {trailerKeys[movie.id] ? (
                  <YouTube
                    videoId={trailerKeys[movie.id]}
                    opts={youtubeOpts}
                    className="youtube-iframe"
                  />
                ) : (
                  <img 
                    src={`${baseURL}${movie.backdrop_path}`} 
                    alt={movie.title || movie.name}
                    className="preview-fallback"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                )}

                <div className="hover-info">
                  <h4>{movie.title || movie.name}</h4>
                  <div className="hover-buttons">
                    <button className="play-btn">Play</button>
                    <button className="more-btn">More Info</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}