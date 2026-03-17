import React from 'react';
import MovieCard from './MovieCard';

const Skeleton = () => (
  <div className="skeleton-card">
    <div className="skeleton skeleton-card-img" />
    <div className="skeleton skeleton-card-title" />
    <div className="skeleton skeleton-card-meta" />
  </div>
);

const MovieRow = ({ title, movies, loading }) => {
  if (loading) {
    return (
      <div className="movies-section">
        <h2 className="section-title">{title}</h2>
        <div className="movies-row">
          {[...Array(8)].map((_, i) => <Skeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) return null;

  return (
    <div className="movies-section">
      <h2 className="section-title">{title}</h2>
      <div className="movies-row">
        {movies.slice(0, 20).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;