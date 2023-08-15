import React, { useState } from "react";
import PropTypes from "prop-types";

const ToggleBlogInfo = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      {props.children} &nbsp;
      <button onClick={() => setShowDetail(!showDetail)}>
        {showDetail ? "Hide" : "Show"}
      </button>
      {showDetail && (
        <div className="blog-detail">
          <p>URL :- {props.blog.url}</p>
          <p>
            LIKES :- {props.blog.likes}{" "}
            <button onClick={() => props.handleLikeBtn(props.blog)}>
              like
            </button>
          </p>
          <p>Author :- {props.blog.author}</p>
          <button onClick={props.handleToDelete}>Remove</button>
        </div>
      )}
    </div>
  );
};

ToggleBlogInfo.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeBtn: PropTypes.func.isRequired,
  handleToDelete: PropTypes.func.isRequired,
};

export default ToggleBlogInfo;
