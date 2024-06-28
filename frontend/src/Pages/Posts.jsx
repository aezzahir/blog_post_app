import Post from "../components/Post";

import React from "react";

const Posts = () => {
  return (
    <div className="jumbotron jumbotron-fluid client" id="client">
      <div className="container text-center">
        <h1>CLIENTS</h1>
        <hr className="client-line1" />
        <div className="row">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
};

export default Posts;
