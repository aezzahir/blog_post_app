import React from "react";
import Header from "../components/Header";
import "@fortawesome/fontawesome-free/css/all.css";
import Posts from "./Posts";

const HomePage = () => {
  return (
    <main>
      <Header />

      <div id="home" className="text-center">
        <div className="caption">
          <h1>Welcome to DevPath</h1>
          <h4>Share your journey to becoming a professional developer</h4>
          <a href="#posts" className="btn btn-outline-light btn-lg">
            Get started
          </a>
        </div>
      </div>

      <div id="features" className="jumbotron jumbotron-fluid">
        <div className="container-fluid text-center">
          <h1>FEATURES</h1>
          <hr />
          <div className="row">
            <div className="col-md-4">
              <i className="fas fa-code fa-4x"></i>
              <h3>Code Snippets</h3>
              <p>
                Share and explore code snippets to help you on your development
                journey.
              </p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-chalkboard-teacher fa-4x"></i>
              <h3>Tutorials</h3>
              <p>Learn from tutorials created by experienced developers.</p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-network-wired fa-4x"></i>
              <h3>Networking</h3>
              <p>
                Connect with other developers and grow your professional
                network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
