import React from "react";
import "./designs/create.css";
import { useParams, useNavigate } from "react-router-dom";

function Delete() {
  const { id } = useParams(); // Get the blog ID from the URL
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const res = await fetch(`http://localhost:5000/blogs/${id}`, {
          method: "DELETE", // Use DELETE method
        });

        if (res.ok) {
          alert("Blog deleted successfully!");
          navigate("/"); // Redirect to the homepage
        } else {
          const data = await res.json();
          alert("Failed to delete blog: " + data.error);
        }
      } catch (err) {
        console.error("Error deleting blog:", err);
      }
    } else {
      navigate("/"); // Redirect back if the user cancels
    }
  };

  return (
    <>
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
        <p>Are you sure you want to delete this blog?</p>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Blog
        </button>
      </div>

      <footer className="blog-footer">
        <p>© 2025 San Miguel Blog. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Delete;