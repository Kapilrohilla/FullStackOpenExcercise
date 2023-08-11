/* eslint-disable no-prototype-builtins */
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import AddNewBlog from "./components/AddNewBlog";
import Toggable from "./components/Toggable";
import ToggleBlogInfo from "./components/ToggleBlogInfo";

import PropTypes from "prop-types";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loginCredential, setLoginCredential] = useState({
    username: "",
    password: "",
  });
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlog = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlog);
    });

    const loggedInUser = JSON.parse(
      window.localStorage.getItem("loggedInUser")
    );
    if (loggedInUser) {
      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  const addBlogRef = useRef();
  const updateUsername = ({ target }) => {
    setLoginCredential({
      ...loginCredential,
      username: target.value,
    });
  };
  const updatePassword = ({ target }) => {
    setLoginCredential({
      ...loginCredential,
      password: target.value,
    });
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginCredential({
      username: "",
      password: "",
    });
    try {
      const response = await loginService.login(loginCredential);
      setUser(response);
      window.localStorage.setItem("loggedInUser", JSON.stringify(response));
      setMessage(`logged in successful`);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setIsSuccess(true);
      blogService.setToken(response.token);
    } catch (exception) {
      setMessage("Wrong username or password");
      setIsSuccess(false);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      console.log("login error occurred");
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <MessagePopup message={message} isSuccess={isSuccess} />
        <LoginForm
          handleLoginSubmit={handleLoginSubmit}
          loginCredential={loginCredential}
          updateCredentials={{ updateUsername, updatePassword }}
        />
      </div>
    );
  }
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedInUser");
    setMessage(`${user.name} logged out successfully`);
    setIsSuccess(true);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  const updateBlogTitle = ({ target }) => {
    setNewBlog({
      ...newBlog,
      title: target.value,
    });
  };
  const updateBlogAuthor = ({ target }) => {
    setNewBlog({
      ...newBlog,
      author: target.value,
    });
  };
  const updateBlogUrl = ({ target }) => {
    setNewBlog({
      ...newBlog,
      url: target.value,
    });
  };
  const createBlog = async (e) => {
    e.preventDefault();
    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
    try {
      const data = await blogService.create(newBlog);
      setMessage(`successfully add: ${newBlog.title}`);

      setBlogs([...blogs, data]);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setIsSuccess(true);
      addBlogRef.current.toggleVisiblity();
    } catch (error) {
      setMessage(`Unable to add: ${newBlog.title}`);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      console.log("unable to add");
      console.log(error);
      isSuccess(false);
    }
  };
  async function handleLikeBtn(blog) {
    const idToUpdate = blog.id;
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    const response = await blogService.update(idToUpdate, updatedBlog);
    if (response.hasOwnProperty("success")) {
      let updatedFinalBlogs = blogs
        .map((o) => {
          if (o.id === idToUpdate) {
            return updatedBlog;
          } else {
            return o;
          }
        })
        .sort((a, b) => b.likes - a.likes);
      setBlogs(updatedFinalBlogs);
    }
  }
  async function handleDelete(id) {
    const response = await blogService.deleteData(id);
    if (response.hasOwnProperty("success")) {
      const blogAfterDeleting = blogs.filter((o) => o.id !== id);
      setBlogs(blogAfterDeleting);
    } else {
      setMessage("failed to delete blog");
      setIsSuccess(false);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }
  return (
    <div>
      <h2>blogs</h2>
      <MessagePopup message={message} isSuccess={isSuccess} />
      <div className="user">
        {user.name} logged in &nbsp;&nbsp;
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
      <Toggable buttonLabel="create new blog" ref={addBlogRef}>
        <AddNewBlog
          handleChange={{ updateBlogAuthor, updateBlogTitle, updateBlogUrl }}
          handleSubmit={createBlog}
          newBlog={newBlog}
        />
      </Toggable>
      {blogs.map((blog) => (
        <ToggleBlogInfo
          blog={blog}
          handleLikeBtn={handleLikeBtn}
          handleToDelete={() => handleDelete(blog.id)}
          key={blog.id}
        >
          <Blog title={blog.title} />
        </ToggleBlogInfo>
      ))}
    </div>
  );
};

const MessagePopup = ({ message, isSuccess }) => {
  return message ? (
    <div
      className="message"
      style={{
        width: "100%",
        border: `3px solid ${isSuccess ? "green" : "red"}`,
        borderRadius: "10px",
        padding: "10px 20px",
        fontSize: "1.3rem",
        marginBlock: "20px",
        backgroundColor: "#d3d3d3",
        color: isSuccess ? "green" : "red",
      }}
    >
      {message}
    </div>
  ) : (
    <></>
  );
};

MessagePopup.propTypes = {
  message: PropTypes.string,
  isSuccess: PropTypes.bool,
};
export default App;
