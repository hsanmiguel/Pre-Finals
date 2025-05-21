import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./designs/create.css"; // Uses existing styles

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", snippet: "", body: "" });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/blogs/${id}`);
        const data = await res.json();
        if (res.ok) {
          setBlog(data);
        } else {
          alert("Failed to fetch blog: " + data.error);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Blog updated successfully!");
        navigate("/");
      } else {
        alert("Failed to update blog: " + data.error);
      }
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
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

      <div className="create-blog-form">
        <h2>Update Blog</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="snippet">Snippet</label>
          <input
            id="snippet"
            name="snippet"
            value={blog.snippet}
            onChange={handleChange}
            required
          />

          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            name="body"
            value={blog.body}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="btn btn-primary">
            Update Blog
          </button>
        </form>
      </div>

      <footer className="blog-footer">
        <p>© 2025 San Miguel Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Update;
