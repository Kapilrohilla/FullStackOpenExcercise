import React from "react";

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

export default AddNewBlog;
