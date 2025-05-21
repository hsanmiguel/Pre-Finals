import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./designs/index.css";

// BlogPost Component
function BlogPost({ post }) {
  return (
    <div className="post">
      <div className="post-content">
        <h2>{post.title}</h2>
        <div className="meta">
          {post.author || "Unknown"} • {new Date(post.createdAt).toLocaleString()}
        </div>
        <p>{post.snippet || post.body.substring(0, 100) + "..."}</p>
        <div style={{ marginTop: "10px" }}>
          <Link to={`/update/${post._id}`} className="btn btn-primary">Update</Link>
          <Link to={`/delete/${post._id}`} className="btn btn-danger">Delete</Link>
        </div>
      </div>
    </div>
  );
}

// Index Page Component
function Index() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/blogs");
        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <header className="blog-header">
        <h1>San Miguel Blog</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/create">Create Blog</Link>
        </nav>
      </header>

      <div className="welcome-msg">
        Welcome, <strong>hanssanmiguel</strong>!!
      </div>

      <div className="blog-container">
        <main className="posts-section">
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => <BlogPost key={post._id} post={post} />)
          ) : (
            <p>No blog posts available.</p>
          )}
        </main>

        <footer className="blog-footer">
          <p>© 2025 San Miguel Blog. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Index;
