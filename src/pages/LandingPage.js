import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  { q: 'What is Netflix?', a: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.' },
  { q: 'How much does Netflix cost?', a: 'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $6.99 to $22.99 a month.' },
  { q: 'Where can I watch?', a: 'Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device.' },
  { q: 'How do I cancel?', a: 'Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees.' },
  { q: 'What can I watch on Netflix?', a: 'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.' },
];

const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-bg" />
        <div className="landing-border-top" />
        <div className="landing-border-bottom" />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '24px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
          <div className="auth-logo">NETFLIX</div>
          <Link to="/login">
            <button style={{ background: 'var(--netflix-red)', color: 'white', padding: '8px 20px', borderRadius: '4px', fontSize: '15px', fontWeight: '700', border: 'none', cursor: 'pointer' }}>
              Sign In
            </button>
          </Link>
        </div>
        <div className="landing-content">
          <h1 className="landing-title">Unlimited Movies, TV Shows, and More</h1>
          <p className="landing-subtitle">Watch anywhere. Cancel anytime.</p>
          <p className="landing-cta-text">Ready to watch? Create or restart your membership.</p>
          <div className="landing-buttons">
            <Link to="/register">
              <button className="btn-landing-primary">Get Started ▶</button>
            </Link>
            <Link to="/login">
              <button className="btn-landing-secondary">Sign In</button>
            </Link>
          </div>
        </div>
      </section>

      <div className="landing-features">
        <div className="feature">
          <div className="feature-text">
            <h2 className="feature-title">Enjoy on your TV</h2>
            <p className="feature-desc">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
          </div>
          <div className="feature-image">📺</div>
        </div>
        <div className="feature">
          <div className="feature-text">
            <h2 className="feature-title">Download your shows to watch offline</h2>
            <p className="feature-desc">Save your favorites easily and always have something to watch.</p>
          </div>
          <div className="feature-image">📱</div>
        </div>
        <div className="feature">
          <div className="feature-text">
            <h2 className="feature-title">Watch everywhere</h2>
            <p className="feature-desc">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
          </div>
          <div className="feature-image">💻</div>
        </div>
        <div className="feature">
          <div className="feature-text">
            <h2 className="feature-title">Create profiles for kids</h2>
            <p className="feature-desc">Send kids on adventures with their favorite characters in a space made just for them.</p>
          </div>
          <div className="feature-image">👨‍👩‍👧‍👦</div>
        </div>
      </div>

      <section className="landing-faq">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item">
            <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              {faq.q}
              <span>{openFaq === i ? '✕' : '+'}</span>
            </button>
            {openFaq === i && <div className="faq-answer">{faq.a}</div>}
          </div>
        ))}
        <div style={{ marginTop: '40px' }}>
          <p style={{ marginBottom: '16px', fontSize: '18px', color: '#e5e5e5' }}>Ready to watch?</p>
          <Link to="/register">
            <button className="btn-landing-primary">Get Started ▶</button>
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <p style={{ marginBottom: '20px' }}>Questions? Call 1-800-NETFLIX</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '20px' }}>
          {['FAQ','Help Center','Account','Media Center','Investor Relations','Jobs','Ways to Watch','Terms of Use','Privacy','Cookie Preferences','Corporate Information','Contact Us'].map(link => (
            <a key={link} href="#/" style={{ color: 'var(--netflix-gray)', fontSize: '13px' }}>{link}</a>
          ))}
        </div>
        <p style={{ fontSize: '13px' }}>Netflix Clone – Built with React & Node.js</p>
      </footer>
    </div>
  );
};

export default LandingPage;