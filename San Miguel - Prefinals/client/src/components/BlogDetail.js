import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/blogs/${id}`);
      setBlog(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load blog post');
      console.error('Error fetching blog:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!blog) {
    return <div className="no-results">Blog post not found</div>;
  }

  return (
    <div className="blog-detail-container">
      <button 
        className="btn btn-primary back-button"
        onClick={() => navigate(-1)}
      >
        ← Back to Blogs
      </button>
      
      <article className="blog-detail">
        <h1>{blog.title}</h1>
        <div className="meta">
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>
        <div className="blog-content">
          {blog.body}
        </div>
      </article>
    </div>
  );
};

export default BlogDetail; 