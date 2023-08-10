import React, { useState } from "react";

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
        <div>
          <p>URL :- {props.blog.url}</p>
          <p>
            LIKES :- {props.blog.likes}{" "}
            <button onClick={() => props.handleLikeBtn(props.blog)}>
              like
            </button>
          </p>
          <p>Author :- {props.blog.author}</p>
        </div>
      )}
    </div>
  );
};

export default ToggleBlogInfo;
