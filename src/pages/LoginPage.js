import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => setForm({ email: 'demo@netflix.com', password: 'demo123' });

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-nav">
        <Link to="/" className="auth-logo">NETFLIX</Link>
      </div>
      <div className="auth-container">
        <div className="auth-box">
          <h1 className="auth-title">Sign In</h1>
          <div className="demo-hint">
            <strong>Demo Account:</strong><br />
            Email: demo@netflix.com | Password: demo123
            <button onClick={fillDemo} style={{ marginLeft: '10px', background: 'var(--netflix-red)', color: 'white', padding: '3px 10px', borderRadius: '3px', fontSize: '11px', border: 'none', cursor: 'pointer' }}>
              Fill Demo
            </button>
          </div>
          {error && <p className="error-msg">⚠️ {error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email or phone number"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="auth-link">
            New to Netflix? <Link to="/register">Sign up now.</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;