import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Your AI-Powered Health Assistant</h1>
        <p>Stay healthy with personalized insights and AI-driven assistance.</p>
        <Link to="/bot" className="cta-btn">
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Our Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>BMI Calculator</h3>
            <p>Check your Body Mass Index and maintain a healthy weight.</p>
          </div>
          <div className="feature-card">
            <h3>Medicine Guide</h3>
            <p>Find information on medicines, uses, and side effects.</p>
          </div>
          <div className="feature-card">
            <h3>Health Risk Checker</h3>
            <p>AI-powered analysis to assess potential health risks.</p>
          </div>
          <div className="feature-card">
            <h3>Doctor Bot</h3>
            <p>Get instant health advice from our AI chatbot.</p>
          </div>
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="health-tips">
        <h2>Daily Health Tips</h2>
        <p>
          "Drink plenty of water and maintain a balanced diet for overall
          well-being!"
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>
              "This app helped me track my BMI and manage my diet efficiently!"
            </p>
            <h4>- Sarah M.</h4>
          </div>
          <div className="testimonial-card">
            <p>"The AI bot gave me quick advice, and it was really helpful!"</p>
            <h4>- John D.</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 LifeCare | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Home;
