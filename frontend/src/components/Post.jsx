import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { formatISO9075 } from "date-fns";

const Post = ({ title, summary, createdAt, cover, content, author }) => {
  // Function to strip HTML tags from content
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <img
          src={"http://localhost:4000/" + cover}
          className="card-img"
          alt={title}
        />
      </div>
      <div className="col-md-8">
        <blockquote className="post-summary">{summary}</blockquote>
        <hr className="client-line2" />
        <div className="d-flex align-items-center">
          <p>
            <a className="mr-3 author">{author["email"]}</a>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
        </div>
        <div>
          <p
            className="summary"
            dangerouslySetInnerHTML={{ __html: stripHtmlTags(content) }}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
