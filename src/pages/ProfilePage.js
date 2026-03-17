import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [w, f] = await Promise.all([
          API.get('/user/watchlist'),
          API.get('/user/favorites'),
        ]);
        setWatchlist(w.data);
        setFavorites(f.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-page">
      <Navbar solid />
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={user?.avatar} alt={user?.name} />
        </div>
        <div>
          <div className="profile-name">{user?.name}</div>
          <div className="profile-email">{user?.email}</div>
          <div className="profile-plan">{user?.plan} Plan</div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            marginLeft: 'auto',
            background: 'var(--netflix-red)',
            color: 'white',
            padding: '10px 24px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Sign Out
        </button>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-number">{watchlist.length}</div>
          <div className="stat-label">My List</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{favorites.length}</div>
          <div className="stat-label">Favorites</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">99</div>
          <div className="stat-label">Hours Watched</div>
        </div>
      </div>

      <div style={{
        background: 'var(--netflix-dark2)',
        borderRadius: '8px',
        padding: '30px',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
          Account Details
        </h2>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '16px 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <span style={{ color: 'var(--netflix-gray)' }}>Member Since</span>
            <span>March 2024</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '16px 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <span style={{ color: 'var(--netflix-gray)' }}>Plan</span>
            <span style={{ color: 'var(--netflix-red)', fontWeight: '700' }}>{user?.plan}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '16px 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <span style={{ color: 'var(--netflix-gray)' }}>Email</span>
            <span>{user?.email}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '16px 0'
          }}>
            <span style={{ color: 'var(--netflix-gray)' }}>Status</span>
            <span style={{ color: '#46d369', fontWeight: '700' }}>Active</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <button
          onClick={() => navigate('/watchlist')}
          className="btn-info"
          style={{ padding: '12px 24px' }}
        >
          My List ({watchlist.length})
        </button>
        <button
          onClick={() => navigate('/home')}
          className="btn-info"
          style={{ padding: '12px 24px' }}
        >
          Browse Movies
        </button>
        <button
          onClick={() => navigate('/search')}
          className="btn-info"
          style={{ padding: '12px 24px' }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;