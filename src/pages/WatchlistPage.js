import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { BACKDROP, POSTER } from '../utils/api';
import API from '../utils/api';

const WatchlistPage = () => {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWatchlist = async () => {
    try {
      const { data } = await API.get('/user/watchlist');
      setWatchlist(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const handleRemove = async (movieId) => {
    try {
      await API.delete(`/user/watchlist/${movieId}`);
      setWatchlist(watchlist.filter(m => m.id !== movieId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="list-page">
      <Navbar solid />
      <h1 className="list-page-title">My List</h1>

      {loading && (
        <div className="loading-screen" style={{ minHeight: '200px' }}>
          <div className="netflix-loader">N</div>
        </div>
      )}

      {!loading && watchlist.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <div className="empty-state-title">Your list is empty</div>
          <div className="empty-state-text">
            Add movies and TV shows to keep track of what you want to watch
          </div>
          <button
            className="btn-play"
            onClick={() => navigate('/home')}
          >
            Browse Movies
          </button>
        </div>
      )}

      <div className="list-grid">
        {watchlist.map(movie => {
          const title = movie.title || movie.name;
          const image = BACKDROP(movie.backdrop_path) || POSTER(movie.poster_path);
          const type = movie.media_type || 'movie';
          return (
            <div
              key={movie.id}
              className="list-card"
              onClick={() => navigate(`/movie/${type}/${movie.id}`)}
            >
              <img
                src={image}
                alt={title}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x169/141414/E50914?text=${encodeURIComponent(title?.slice(0, 15) || 'Movie')}`;
                }}
              />
              <div className="list-card-info">
                <div className="list-card-title">{title}</div>
                <div style={{ fontSize: '12px', color: 'var(--netflix-gray)' }}>
                  {type === 'movie' ? '🎬 Movie' : '📺 TV Show'}
                  {movie.vote_average > 0 && ` • ⭐ ${movie.vote_average?.toFixed(1)}`}
                </div>
              </div>
              <button
                className="list-card-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(movie.id);
                }}
                title="Remove from list"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WatchlistPage;