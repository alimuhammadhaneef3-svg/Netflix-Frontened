import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MovieRow from '../components/MovieRow';
import { BACKDROP } from '../utils/api';
import API from '../utils/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [hero, setHero] = useState(null);
  const [trending, setTrending] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [romance, setRomance] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [t, o, tr, a, c, h, r, d] = await Promise.all([
          API.get('/movies/trending'),
          API.get('/movies/originals'),
          API.get('/movies/top-rated'),
          API.get('/movies/action'),
          API.get('/movies/comedy'),
          API.get('/movies/horror'),
          API.get('/movies/romance'),
          API.get('/movies/documentaries'),
        ]);
        setTrending(t.data.results);
        setOriginals(o.data.results);
        setTopRated(tr.data.results);
        setAction(a.data.results);
        setComedy(c.data.results);
        setHorror(h.data.results);
        setRomance(r.data.results);
        setDocumentaries(d.data.results);
        const heroMovie = t.data.results[Math.floor(Math.random() * 5)];
        setHero(heroMovie);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const type = hero?.media_type || 'movie';
  const title = hero?.title || hero?.name;
  const overview = hero?.overview;
  const rating = hero?.vote_average?.toFixed(1);
  const year = (hero?.release_date || hero?.first_air_date || '').slice(0, 4);

  return (
    <div style={{ background: 'var(--netflix-dark)', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Banner */}
      {hero && (
        <div className="hero">
          <div
            className="hero-backdrop"
            style={{ backgroundImage: `url(${BACKDROP(hero.backdrop_path)})` }}
          />
          <div className="hero-gradient" />
          <div className="hero-content">
            <div className="hero-badge">🎬 Netflix Original</div>
            <h1 className="hero-title">{title}</h1>
            <div className="hero-meta">
              <span className="hero-match">98% Match</span>
              <span className="hero-year">{year}</span>
              {rating && <span className="hero-rating">⭐ {rating}</span>}
            </div>
            <p className="hero-description">{overview}</p>
            <div className="hero-buttons">
              <button
                className="btn-play"
                onClick={() => navigate(`/watch/${type}/${hero.id}`)}
              >
                ▶ Play
              </button>
              <button
                className="btn-info"
                onClick={() => navigate(`/movie/${type}/${hero.id}`)}
              >
                ℹ More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movie Rows */}
      <div style={{ marginTop: '-80px', position: 'relative', zIndex: 2 }}>
        <MovieRow title="🔥 Trending Now" movies={trending} loading={loading} />
        <MovieRow title="🎬 Netflix Originals" movies={originals} loading={loading} />
        <MovieRow title="⭐ Top Rated" movies={topRated} loading={loading} />
        <MovieRow title="💥 Action Movies" movies={action} loading={loading} />
        <MovieRow title="😂 Comedy Movies" movies={comedy} loading={loading} />
        <MovieRow title="😱 Horror Movies" movies={horror} loading={loading} />
        <MovieRow title="💕 Romance Movies" movies={romance} loading={loading} />
        <MovieRow title="🎥 Documentaries" movies={documentaries} loading={loading} />
      </div>
    </div>
  );
};

export default HomePage;