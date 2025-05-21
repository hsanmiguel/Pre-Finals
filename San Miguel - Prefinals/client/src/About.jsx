import React from "react";
import "./designs/about.css";

function About() {
  return (
    <div className="about-page">
      <header className="blog-header">
        <h1>San Miguel Blog</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/create">Create Blog</a>
        </nav>
      </header>

      <div className="welcome-msg">
        Learn more about our journey and mission.
      </div>

      <main className="about-container">
        <h1>About Us</h1>
        <p>
          Welcome to our blog! We're passionate about sharing valuable insights on technology,
          software development, and digital trends.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our goal is to help developers, designers, and tech enthusiasts stay updated and inspired
          through high-quality articles and tutorials.
        </p>

        <h2>Contact</h2>
        <p>
          Got questions or suggestions? Reach out to us at{" "}
          <a href="mailto:hsanmiguel@gbox.adnu.edu.ph">hsanmiguel@gbox.adnu.edu.ph</a>.
        </p>
      </main>

      <footer className="blog-footer">
        <p>© 2025 San Miguel Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;
