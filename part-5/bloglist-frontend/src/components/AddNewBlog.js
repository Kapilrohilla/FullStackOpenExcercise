import React from "react";
import PropTypes from "prop-types";

const AddNewBlog = ({ handleChange, handleSubmit, newBlog }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="title">
        <label htmlFor="title">title: </label>
        <input
          type="text"
          value={newBlog.title}
          onChange={handleChange.updateBlogTitle}
          id="title"
        />
      </div>
      <div className="author">
        <label htmlFor="author">author: </label>
        <input
          type="text"
          id="author"
          value={newBlog.author}
          onChange={handleChange.updateBlogAuthor}
        />
      </div>
      <div className="url">
        <label htmlFor="url">url: </label>
        <input
          type="text"
          id="url"
          value={newBlog.url}
          onChange={handleChange.updateBlogUrl}
        />
      </div>
      <button type="submit">CREATE</button>
    </form>
  );
};

AddNewBlog.propTypes = {
  handleChange: PropTypes.exact({
    updateBlogAuthor: PropTypes.func.isRequired,
    updateBlogTitle: PropTypes.func.isRequired,
    updateBlogUrl: PropTypes.func.isRequired,
  }),
  handleSubmit: PropTypes.func.isRequired,
  newBlog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddNewBlog;
