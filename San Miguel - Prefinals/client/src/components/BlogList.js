import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="blog-container">
      {blogs.length === 0 ? (
        <div className="no-results">No blogs found</div>
      ) : (
        blogs.map((blog) => (
          <div 
            key={blog._id} 
            className="post"
            onClick={() => handlePostClick(blog._id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="post-content">
              <h2>{blog.title}</h2>
              <div className="meta">
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>
              <p>{blog.snippet}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList; 