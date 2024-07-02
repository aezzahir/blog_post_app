import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    try {
      const response = await fetch(`http://localhost:4000/post/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const postInfo = await response.json();
      setTitle(postInfo.title);
      setContent(postInfo.content);
      setSummary(postInfo.summary);
    } catch (e) {
      console.error("Failed to fetch post:", e);
      setError("Failed to load post. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (file) {
      data.set('file', file);
    }
    
    try {
      const response = await fetch(`http://localhost:4000/post`, {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const updatedPost = await response.json();
      console.log("Post updated successfully:", updatedPost);
      navigate('/posts'); // or wherever you want to redirect after update
    } catch (e) {
      console.error("Failed to update post:", e);
      setError(`Failed to update post: ${e.message}`);
    }
  }

  return (
    <form className="create-post-form" onSubmit={updatePost}>
      <div className="form-group">
        <input
          type="text"
          name="title"
          className="form-control"
          id="title"
          placeholder="Enter title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="summary"
          className="form-control"
          id="summary"
          placeholder="Enter summary"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="file"
          name="file"
          className="form-control-file"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      <div className="form-group">
        <ReactQuill
          value={content}
          onChange={(newValue) => setContent(newValue)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update Post
      </button>
    </form>
  );
};

export default EditPost;