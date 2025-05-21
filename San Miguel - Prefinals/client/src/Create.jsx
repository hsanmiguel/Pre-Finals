import React from "react";
import "./designs/create.css";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = {
      title: e.target.title.value,
      snippet: e.target.snippet.value,
      body: e.target.body.value,
    };

    try {
      const res = await fetch("http://localhost:5000/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Blog created successfully!");
        e.target.reset();
        navigate("/");
      } else {
        alert("Failed to create blog: " + data.error);
      }
    } catch (err) {
      console.error("Error submitting blog:", err);
    }
  };

  return (
    <div className="create-page">
      <header className="blog-header">
        <h1>San Miguel Blog</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/create">Create Blog</a>
        </nav>
      </header>

      <div className="welcome-msg">
        Welcome, <strong>hanssanmiguel</strong>!
      </div>

      <div className="create-blog-form">
        <form onSubmit={handleSubmit}>
          <h2>Create a New Blog</h2>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required />

          <label htmlFor="snippet">Snippet</label>
          <input type="text" id="snippet" name="snippet" required />

          <label htmlFor="body">Body</label>
          <textarea id="body" name="body" required rows={8}></textarea>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

      <footer className="blog-footer">
        <p>© 2025 San Miguel Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Create;
