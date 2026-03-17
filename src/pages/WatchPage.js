import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BACKDROP } from '../utils/api';
import API from '../utils/api';

const WatchPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await API.get(`/movies/details/${type}/${id}`);
        setMovie(data);
        await API.post('/user/continue-watching', {
          movie: {
            id: data.id,
            title: data.title || data.name,
            poster_path: data.poster_path,
            backdrop_path: data.backdrop_path,
            media_type: type,
            vote_average: data.vote_average,
            overview: data.overview
          },
          progress: 0
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovie();
  }, [type, id]);

  const title = movie?.title || movie?.name;

  return (
    <div className="watch-page">
      <div className="watch-nav">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', color: 'var(--netflix-red)' }}>
          NETFLIX
        </div>
        <div style={{ width: '60px' }} />
      </div>

      <div className="video-container">
        {!playing ? (
          <div className="video-placeholder">
            {movie && (
              <img
                className="video-placeholder-img"
                src={BACKDROP(movie.backdrop_path)}
                alt={title}
              />
            )}
            <div className="video-title-overlay">{title}</div>
            <button className="play-big-btn" onClick={() => setPlaying(true)}>
              ▶
            </button>
            <div className="video-subtitle">Click to play</div>
          </div>
        ) : (
          <div className="video-placeholder">
            {movie && (
              <img
                className="video-placeholder-img"
                src={BACKDROP(movie.backdrop_path)}
                alt={title}
                style={{ opacity: 0.5 }}
              />
            )}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎬</div>
              <div className="video-title-overlay">{title}</div>
              <div className="video-subtitle" style={{ marginTop: '10px' }}>
                Now Playing — Full video requires streaming license
              </div>
              <button
                onClick={() => setPlaying(false)}
                style={{ marginTop: '20px', background: 'rgba(255,255,255,0.2)', color: 'white', padding: '10px 24px', borderRadius: '4px', border: '1px solid white', cursor: 'pointer', fontSize: '14px' }}
              >
                ⏹ Stop
              </button>
            </div>
          </div>
        )}
      </div>

      {movie && (
        <div className="watch-info">
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '36px', marginBottom: '12px' }}>
            {title}
          </h1>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '14px', color: 'var(--netflix-light)' }}>
            {movie.vote_average > 0 && <span>⭐ {movie.vote_average?.toFixed(1)}</span>}
            {(movie.release_date || movie.first_air_date) && (
              <span>{(movie.release_date || movie.first_air_date).slice(0, 4)}</span>
            )}
            {movie.runtime && <span>⏱ {movie.runtime} min</span>}
          </div>
          <p style={{ color: '#d2d2d2', fontSize: '16px', lineHeight: '1.7', maxWidth: '800px' }}>
            {movie.overview}
          </p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <button
              className="btn-info"
              onClick={() => navigate(`/movie/${type}/${id}`)}
            >
              ℹ More Info
            </button>
            <button
              className="btn-info"
              onClick={() => navigate('/home')}
            >
              🏠 Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchPage;