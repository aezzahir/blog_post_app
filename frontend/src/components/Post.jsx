import React from "react";

const Post = () => {
  return (
    <div className="col-md-6">
      <div className="row">
        <div className="col-md-4">
          <img src="assets/client1.png" alt="Client 1" />
        </div>
        <div className="col-md-8">
          <blockquote>
            <i className="fas fa-quote-left"></i>I see DevPath support as more
            of a partner to my company than a resource. I can pick up the phone
            and talk to anyone at any time, and the way that they interact with
            us as a business makes it really simple.
          </blockquote>
          <hr className="client-line2" />
          <address>- Eric, small business owner</address>
        </div>
      </div>
    </div>
  );
};

export default Post;
