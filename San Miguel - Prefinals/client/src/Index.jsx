import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import "./designs/index.css"

// const blogPosts = [
//     {
//       id: 1,
//       Title: "Welcome to My Blog",
//       Snippet: "Jane Doe",
//       Body: "April 23, 2025"
//     },
//     {
//       id: 2,
//       itle: "Welcome to My Blog",
//       Snippet: "Jane Doe",
//       Body: "April 23, 2025",
//     },
//   ];

  function BlogPost({ post }) {
    return (
      <div>
        <h2>{post.title}</h2>
        <p>{post.snippet}</p>
        <p>{post.body}</p>
        <p>
            <Link to = {`/update/${post._id}`} className="btn btn-success">Update</Link>
            <Link to = {`/delete/${post._id}`} className="btn btn-danger">Delete</Link>
        </p>
        <hr />
      </div>
    );
  }

function Index() {
    const [blogPosts, setBlogPosts] = useState([]);

  // Fetch blog posts from the backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/blogs"); // Adjust the URL if needed
        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };

    fetchBlogs();
  }, []);
    return (
        <>
            <div className="blog-container">
                <header className="blog-header">
                    <h1>San Miguel Blog</h1>
                    <nav>
                        <ul>
                            <a href="/">Home</a>
                            <a href="/about">About</a>
                            <a href="/create">Create</a>
                        </ul>
                    </nav>
                </header>
                <main className="posts-section">
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => <BlogPost key={post.id} post={post} />)
        ) : (
          <p>No blog posts available.</p>
        )}
      </main>
                <footer className="blog-footer">
                <p>© 2025 San Miguel Blog. All rights reserved.</p> 
                </footer>
            </div>
        </>
    )
}

export default Index;