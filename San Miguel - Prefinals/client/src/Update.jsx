import React, { useState, useEffect } from "react";
import "./designs/create.css";
import { useParams, useNavigate } from "react-router-dom";

function Update() {
  const { id } = useParams(); // Get the blog ID from the URL
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", snippet: "", body: "" });

  // Fetch the existing blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/blogs/${id}`);
        const data = await res.json();
        if (res.ok) {
          setBlog(data); // Set the blog data to pre-fill the form
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
        method: "PUT", // Use PUT for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog), // Send the updated blog data
      });

      const data = await res.json();
      if (res.ok) {
        alert("Blog updated successfully!");
        navigate("/"); // Redirect to the homepage
      } else {
        alert("Failed to update blog: " + data.error);
      }
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value }); // Update the blog state as the user types
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
          <input
            type="text"
            id="title"
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="snippet">Blog snippet:</label>
          <input
            type="text"
            id="snippet"
            name="snippet"
            value={blog.snippet}
            onChange={handleChange}
            required
          />
          <label htmlFor="body">Blog body:</label>
          <textarea
            id="body"
            name="body"
            value={blog.body}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Update</button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Update;