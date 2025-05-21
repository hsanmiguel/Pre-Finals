import React from "react";
import "./designs/delete.css"; // New CSS specific to Delete
import { useParams, useNavigate } from "react-router-dom";

function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const res = await fetch(`http://localhost:5000/blogs/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("Blog deleted successfully!");
          navigate("/");
        } else {
          const data = await res.json();
          alert("Failed to delete blog: " + data.error);
        }
      } catch (err) {
        console.error("Error deleting blog:", err);
        alert("An error occurred. Please try again.");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="delete-page">
        <header className="blog-header">
          <h1>San Miguel Blog</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/create">Create Blog</a>
          </nav>
        </header>

        <main className="delete-confirm-box">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this blog post?</p>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Blog
          </button>
        </main>

        <footer className="blog-footer">
          <p>© 2025 San Miguel Blog. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default Delete;
