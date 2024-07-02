import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:4000/post");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="jumbotron jumbotron-fluid client" id="client">
      <div className="container text-center">
        <h1>Posts</h1>
        <hr className="client-line1" />
        <div className="row">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="col-md-6 user-post">
                <Post {...post} />
                <Link to={`/edit/${post._id}`} className="btn btn-primary mt-2">
                  Edit
                </Link>
              </div>
            ))
          ) : (
            <p>No posts found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;