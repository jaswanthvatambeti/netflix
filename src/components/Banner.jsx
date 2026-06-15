import { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Banner.css";

const baseImgUrl = "https://image.tmdb.org/t/p/original";

export default function Banner() {
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    async function loadBanner() {
      try {
        const res = await axios.get("/trending/all/week");
        const selected = res.data.results[Math.floor(Math.random() * res.data.results.length)];
        setMovie(selected);

        const videoData = await axios.get(`/movie/${selected.id}/videos`);
        const trailer = videoData.data.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        setVideoKey(trailer?.key || null);
      } catch (err) {
        console.log("Banner error:", err);
      }
    }
    loadBanner();
  }, []);

  return (
    <header className="banner">
      {videoKey ? (
        <div className="banner-video">
          <iframe
            className="banner-iframe"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=${
              isMuted ? 1 : 0
            }&controls=0&loop=1&playlist=${videoKey}&modestbranding=1&rel=0`}
            allow="autoplay; encrypted-media; fullscreen"
            title="Banner Trailer"
            frameBorder="0"
          />
        </div>
      ) : (
        movie?.backdrop_path && (
          <img
            className="banner-image"
            src={`${baseImgUrl}${movie.backdrop_path}`}
            alt={movie.title || movie.name}
          />
        )
      )}

      <div className="banner-overlay"></div>
      
      <div className="banner-content">
        <h1 className="banner-title">
          {movie?.title || movie?.name}
        </h1>
        <p className="banner-description">
          {movie?.overview}
        </p>
        <div className="banner-buttons">
          <button className="banner-btn play">
            <span>▶</span> Play
          </button>
          <button className="banner-btn info">
            <span>ℹ</span> More Info
          </button>
          <button 
            className="banner-btn mute"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>
    </header>
  );
}