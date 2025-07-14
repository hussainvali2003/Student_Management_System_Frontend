import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaGraduationCap } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import "./Styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo" onClick={() => navigate("/")}>
          <FaGraduationCap className="logo-icon" />
          <span>Hussain Institute</span>
        </div>
        <nav className="nav">
          <button className="nav-btn active">Home</button>
          <button className="nav-btn" onClick={() => navigate("/login")}>
            Login <FiArrowRight className="btn-icon" />
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to <span>Bright Future Academy</span></h1>
          <p className="tagline">Where excellence meets innovation in education</p>
          <div className="stats">
            <div className="stat">
              <h3>50+</h3>
              <p>Courses Offered</p>
            </div>
            <div className="stat">
              <h3>98%</h3>
              <p>Graduation Rate</p>
            </div>
            <div className="stat">
              <h3>25</h3>
              <p>Years of Excellence</p>
            </div>
          </div>
          <button className="cta-btn" onClick={() => navigate("/login")}>
            Explore Our Portal <FiArrowRight />
          </button>
        </div>
        <div className="hero-image">
          <img src="https://i.postimg.cc/4dXbtyCs/body.jpg" alt="Campus View" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Our System?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-time Analytics</h3>
            <p>Track academic progress with our comprehensive dashboard</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Access your records anytime, anywhere</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Data</h3>
            <p>Military-grade encryption protects your information</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-about">
            <FaGraduationCap className="footer-logo" />
            <p>Bright Future Academy has been shaping young minds since 1998, providing world-class education with state-of-the-art facilities.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#">Admissions</a>
            <a href="#">Academic Calendar</a>
            <a href="#">Faculty Directory</a>
          </div>
          <div className="footer-social">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
            <p>contact@brightfuture.edu</p>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2023 Bright Future Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;