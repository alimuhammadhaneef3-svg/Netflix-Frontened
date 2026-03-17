import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { BACKDROP, POSTER } from '../utils/api';
import API from '../utils/api';

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data } = await API.get('/movies/trending');
        setTrending(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (query.trim().length > 2) {
        setLoading(true);
        try {
          const { data } = await API.get(`/movies/search?q=${encodeURIComponent(query)}`);
          setResults(data.results.filter(r => r.media_type !== 'person'));
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [query]);

  const displayItems = query.trim().length > 2 ? results : trending;
  const displayTitle = query.trim().length > 2 ? `Results for "${query}"` : 'Trending Searches';

  return (
    <div className="search-page">
      <Navbar solid />

      <div className="search-bar-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search for movies, TV shows..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}
          >
            ✕
          </button>
        )}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--netflix-gray)' }}>
          Searching...
        </div>
      )}

      {!loading && (
        <>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: 'var(--netflix-light)' }}>
            {displayTitle}
          </h2>
          {displayItems.length === 0 && query.trim().length > 2 && (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <div className="empty-state-title">No results found</div>
              <div className="empty-state-text">Try searching for something else</div>
            </div>
          )}
          <div className="search-results-grid">
            {displayItems.map(item => {
              const type = item.media_type || (item.title ? 'movie' : 'tv');
              const title = item.title || item.name;
              const image = BACKDROP(item.backdrop_path) || POSTER(item.poster_path);
              return (
                <div
                  key={item.id}
                  className="search-card"
                  onClick={() => navigate(`/movie/${type}/${item.id}`)}
                >
                  <img
                    src={image}
                    alt={title}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x169/141414/E50914?text=${encodeURIComponent(title?.slice(0, 15) || 'Movie')}`;
                    }}
                  />
                  <div className="search-card-info">
                    <div className="search-card-title">{title}</div>
                    <div className="search-card-type">
                      {type === 'movie' ? '🎬 Movie' : '📺 TV Show'}
                      {item.vote_average > 0 && ` • ⭐ ${item.vote_average?.toFixed(1)}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;