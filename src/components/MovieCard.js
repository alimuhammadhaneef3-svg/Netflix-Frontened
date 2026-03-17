import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKDROP, POSTER } from '../utils/api';
import API from '../utils/api';

const MovieCard = ({ movie, onWatchlistChange }) => {
  const navigate = useNavigate();
  const [inList, setInList] = useState(false);

  const type = movie.media_type || (movie.title ? 'movie' : 'tv');
  const title = movie.title || movie.name;
  const rating = movie.vote_average?.toFixed(1);
  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);
  const image = BACKDROP(movie.backdrop_path) || POSTER(movie.poster_path);
  const match = Math.floor(Math.random() * 30 + 70);

  const handlePlay = (e) => {
    e.stopPropagation();
    navigate(`/watch/${type}/${movie.id}`);
  };

  const handleInfo = (e) => {
    e.stopPropagation();
    navigate(`/movie/${type}/${movie.id}`);
  };

  const handleAddList = async (e) => {
    e.stopPropagation();
    try {
      if (inList) {
        await API.delete(`/user/watchlist/${movie.id}`);
        setInList(false);
      } else {
        await API.post('/user/watchlist', {
          movie: {
            id: movie.id,
            title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            media_type: type,
            vote_average: movie.vote_average,
            release_date: movie.release_date || movie.first_air_date,
            overview: movie.overview
          }
        });
        setInList(true);
      }
      if (onWatchlistChange) onWatchlistChange();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${type}/${movie.id}`)}>
      <img
        src={image}
        alt={title}
        loading="lazy"
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/300x169/141414/E50914?text=${encodeURIComponent(title?.slice(0,15) || 'Movie')}`;
        }}
      />
      <div className="movie-card-overlay">
        <div className="card-actions">
          <button className="card-btn play" onClick={handlePlay} title="Play">▶</button>
          <button className="card-btn" onClick={handleAddList} title={inList ? 'Remove' : 'Add to list'}>
            {inList ? '✓' : '+'}
          </button>
          <button className="card-btn" onClick={handleInfo} title="More info">ℹ</button>
        </div>
        <div className="card-title">{title}</div>
        <div className="card-meta">
          <span className="card-match">{match}% Match</span>
          {year && <span>{year}</span>}
          {rating && <span>⭐ {rating}</span>}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;