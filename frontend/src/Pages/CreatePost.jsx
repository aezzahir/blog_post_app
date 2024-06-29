import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Navigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS for styling

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null); // State for file input
  const [redirect, setRedirect] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update to select only one file
  };

  const createNewPost = async (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    if (file) {
      data.append("file", file);
    }

    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        body: data,
        credentials: "include",
      });
      console.log(await response.json());
      if (response.ok) {
        setRedirect(true);
      }

      // if (response.ok) {
      //   console.log("Post created successfully!");
      //   // Reset form fields
      //   setTitle("");
      //   setSummary("");
      //   setContent("");
      //   setFile(null);
      // } else {
      //   console.error("Failed to create post");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (redirect) return <Navigate to={"/"} />;

  return (
    <form className="create-post-form" onSubmit={createNewPost}>
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
        Create New Post
      </button>
    </form>
  );
};

export default CreatePost;
