import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MovieRow from '../components/MovieRow';
import API from '../utils/api';

const MoviesPage = () => {
  const [topRated, setTopRated] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [romance, setRomance] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [tr, a, c, h, r, d, n, u] = await Promise.all([
          API.get('/movies/top-rated'),
          API.get('/movies/action'),
          API.get('/movies/comedy'),
          API.get('/movies/horror'),
          API.get('/movies/romance'),
          API.get('/movies/documentaries'),
          API.get('/movies/now-playing'),
          API.get('/movies/upcoming'),
        ]);
        setTopRated(tr.data.results);
        setAction(a.data.results);
        setComedy(c.data.results);
        setHorror(h.data.results);
        setRomance(r.data.results);
        setDocumentaries(d.data.results);
        setNowPlaying(n.data.results);
        setUpcoming(u.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div style={{ background: 'var(--netflix-dark)', minHeight: '100vh', paddingTop: '100px' }}>
      <Navbar solid />

      <div style={{ padding: '0 60px 40px' }}>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px', marginBottom: '8px', letterSpacing: '2px' }}>
          Movies
        </h1>
        <p style={{ color: 'var(--netflix-gray)', fontSize: '16px', marginBottom: '40px' }}>
          Blockbusters, classics, and everything in between
        </p>
      </div>

      <MovieRow title="🎬 Now Playing" movies={nowPlaying} loading={loading} />
      <MovieRow title="🔜 Upcoming" movies={upcoming} loading={loading} />
      <MovieRow title="⭐ Top Rated" movies={topRated} loading={loading} />
      <MovieRow title="💥 Action" movies={action} loading={loading} />
      <MovieRow title="😂 Comedy" movies={comedy} loading={loading} />
      <MovieRow title="😱 Horror" movies={horror} loading={loading} />
      <MovieRow title="💕 Romance" movies={romance} loading={loading} />
      <MovieRow title="🎥 Documentaries" movies={documentaries} loading={loading} />
    </div>
  );
};

export default MoviesPage;