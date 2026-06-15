import { useState, useEffect, useRef } from 'react';
import axios from '../api/axios';

const TrailerPlayer = ({ movieId, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/movie/${movieId}/videos`);
        const videos = response.data.results;
        
        // Find trailer (prefer official trailer, then any trailer)
        const trailer = videos.find(video => 
          video.type === 'Trailer' && video.official
        ) || videos.find(video => video.type === 'Trailer');
        
        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setError('No trailer available');
        }
      } catch (err) {
        setError('Failed to load trailer');
        console.error('Error fetching trailer:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId]);

  useEffect(() => {
    // Auto-play when trailer key is available
    if (trailerKey && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Auto-play failed:', err);
      });
    }
  }, [trailerKey]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div className="text-white text-xl">Loading trailer...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div className="text-white text-xl text-center">
          <p>{error}</p>
          <button 
            onClick={handleClose}
            className="mt-4 bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white text-2xl z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition"
      >
        ✕
      </button>

      {/* Video Player */}
      <div className="relative w-full max-w-4xl aspect-video">
        <iframe
          ref={videoRef}
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
          className="w-full h-full rounded-lg"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Movie Trailer"
        />
      </div>
    </div>
  );
};

export default TrailerPlayer;