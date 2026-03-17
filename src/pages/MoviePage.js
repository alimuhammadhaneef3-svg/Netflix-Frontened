import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MovieRow from '../components/MovieRow';
import { BACKDROP, POSTER } from '../utils/api';
import API from '../utils/api';

const MoviePage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await API.get(`/movies/details/${type}/${id}`);
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [type, id]);

  const handleWatchlist = async () => {
    try {
      if (inWatchlist) {
        await API.delete(`/user/watchlist/${id}`);
        setInWatchlist(false);
      } else {
        await API.post('/user/watchlist', {
          movie: {
            id: movie.id,
            title: movie.title || movie.name,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            media_type: type,
            vote_average: movie.vote_average,
            overview: movie.overview
          }
        });
        setInWatchlist(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="loading-screen">
      <div className="netflix-loader">N</div>
    </div>
  );

  if (!movie) return null;

  const title = movie.title || movie.name;
  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);
  const rating = movie.vote_average?.toFixed(1);
  const cast = movie.credits?.cast?.slice(0, 10) || [];
  const similar = movie.similar?.results || [];
  const genres = movie.genres || [];
  const runtime = movie.runtime ? `${movie.runtime} min` : movie.episode_run_time?.[0] ? `${movie.episode_run_time[0]} min/ep` : '';

  return (
    <div className="movie-detail-page">
      <Navbar solid />

      <div className="movie-detail-hero">
        <img
          src={BACKDROP(movie.backdrop_path) || POSTER(movie.poster_path)}
          alt={title}
          onError={(e) => { e.target.src = `https://via.placeholder.com/1280x720/141414/E50914?text=${encodeURIComponent(title)}`; }}
        />
        <div className="movie-detail-gradient" />
      </div>

      <div className="movie-detail-content">
        <h1 className="movie-detail-title">{title}</h1>

        <div className="movie-detail-meta">
          {rating && <span style={{ color: '#F5C518', fontWeight: 700 }}>⭐ {rating}/10</span>}
          {year && <span style={{ color: 'var(--netflix-light)' }}>{year}</span>}
          {runtime && <span style={{ color: 'var(--netflix-light)' }}>⏱ {runtime}</span>}
          {movie.status && <span style={{ color: '#46d369', fontWeight: 600 }}>{movie.status}</span>}
          {movie.original_language && <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>{movie.original_language.toUpperCase()}</span>}
        </div>

        <div className="genre-tags">
          {genres.map(g => (
            <span key={g.id} className="genre-tag">{g.name}</span>
          ))}
        </div>

        <div className="movie-detail-buttons">
          <button className="btn-play" onClick={() => navigate(`/watch/${type}/${id}`)}>
            ▶ Play
          </button>
          <button className="btn-info" onClick={handleWatchlist}>
            {inWatchlist ? '✓ In My List' : '+ My List'}
          </button>
          <button className="btn-info" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        <p className="movie-detail-overview">{movie.overview}</p>

        {cast.length > 0 && (
          <div className="cast-section">
            <h3 className="section-title">Cast</h3>
            <div className="cast-grid">
              {cast.map(person => (
                <div key={person.id} className="cast-card">
                  <img
                    src={person.profile_path
                      ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=333&color=fff`}
                    alt={person.name}
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=333&color=fff`; }}
                  />
                  <div className="cast-name">{person.name}</div>
                  <div className="cast-character">{person.character}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {similar.length > 0 && (
          <MovieRow title="Similar Titles" movies={similar} />
        )}
      </div>
    </div>
  );
};

export default MoviePage;