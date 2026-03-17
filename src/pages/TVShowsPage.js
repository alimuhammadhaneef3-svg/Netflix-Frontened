import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MovieRow from '../components/MovieRow';
import API from '../utils/api';

const TVShowsPage = () => {
  const [popular, setPopular] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [p, o, t] = await Promise.all([
          API.get('/movies/tv/popular'),
          API.get('/movies/originals'),
          API.get('/movies/trending'),
        ]);
        setPopular(p.data.results);
        setOriginals(o.data.results);
        setTrending(t.data.results.filter(r => r.media_type === 'tv'));
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
          TV Shows
        </h1>
        <p style={{ color: 'var(--netflix-gray)', fontSize: '16px', marginBottom: '40px' }}>
          Binge-worthy series, all in one place
        </p>
      </div>

      <MovieRow title="📺 Popular TV Shows" movies={popular} loading={loading} />
      <MovieRow title="🎬 Netflix Originals" movies={originals} loading={loading} />
      <MovieRow title="🔥 Trending TV" movies={trending} loading={loading} />
    </div>
  );
};

export default TVShowsPage;