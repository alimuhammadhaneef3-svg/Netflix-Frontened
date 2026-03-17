import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ solid = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className={`navbar ${solid ? 'solid' : scrolled ? 'scrolled' : 'transparent'}`}>
      <Link to="/home" className="navbar-logo">NETFLIX</Link>
      <ul className="navbar-links">
        <li><Link to="/home" className={isActive('/home')}>Home</Link></li>
        <li><Link to="/tv" className={isActive('/tv')}>TV Shows</Link></li>
        <li><Link to="/movies" className={isActive('/movies')}>Movies</Link></li>
        <li><Link to="/watchlist" className={isActive('/watchlist')}>My List</Link></li>
      </ul>
      <div className="navbar-right">
        <span className="nav-search-icon" onClick={() => navigate('/search')}>🔍</span>
        <span className="nav-bell">🔔</span>
        <div className="nav-profile-dropdown" ref={dropdownRef}>
          <div className="nav-avatar" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img src={user?.avatar} alt={user?.name} />
          </div>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                <span>👤</span> Account
              </Link>
              <Link to="/watchlist" onClick={() => setDropdownOpen(false)}>
                <span>📋</span> My List
              </Link>
              <Link to="/search" onClick={() => setDropdownOpen(false)}>
                <span>🔍</span> Search
              </Link>
              <hr />
              <button onClick={() => { logout(); navigate('/'); }}>
                <span>🚪</span> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;