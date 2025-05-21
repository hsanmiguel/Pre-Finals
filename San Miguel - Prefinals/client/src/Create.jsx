import React from "react";
import "./designs/create.css";
import { useNavigate } from 'react-router-dom'

function Create() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = {
      title: e.target.title.value,
      snippet: e.target.snippet.value,
      body: e.target.body.value
    };

    try {
      const res = await fetch('http://localhost:5000/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
      });

      const data = await res.json();
      if (res.ok) {
        alert("Blog created successfully!");
        e.target.reset(); // clear the form
        navigate("/")
      } else {
        alert("Failed to create blog: " + data.error);
      }
    } catch (err) {
      console.error("Error submitting blog:", err);
    }
  };

  return (
    <React.Fragment>
      <div className="blog-container">
        <header className="blog-header">
          <h1>San Miguel Blog</h1>
          <nav>
            <ul>
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/create">Create Blog</a>
            </ul>
          </nav>
        </header>
      </div>

      <div className="create-blog-content">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Blog title:</label>
          <input type="text" id="title" name="title" required />
          <label htmlFor="snippet">Blog snippet:</label>
          <input type="text" id="snippet" name="snippet" required />
          <label htmlFor="body">Blog body:</label>
          <textarea id="body" name="body" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Create;