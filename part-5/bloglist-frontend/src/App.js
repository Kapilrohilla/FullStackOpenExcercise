import { useState, useEffect, useRef } from "react";
import Blog, { BlogDetail } from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import AddNewBlog from "./components/AddNewBlog";
import Toggable from "./components/Toggable";
import ToggleBlogInfo from "./components/ToggleBlogInfo";
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
    blogService.getAll().then((blogs) => setBlogs(blogs));

    const loggedInUser = JSON.parse(
      window.localStorage.getItem("loggedInUser")
    );
    if (loggedInUser) {
      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addBlogRef = useRef();
  console.log(addBlogRef);
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
  const loginForm = () => (
    <form onSubmit={handleLoginSubmit}>
      <div className="username">
        <label htmlFor="getUsername">username: </label>
        <input
          type="text"
          value={loginCredential.username}
          onChange={updateUsername}
        />
      </div>
      <div className="password">
        <label htmlFor="getPassword">password: </label>
        <input
          type="password"
          value={loginCredential.password}
          onChange={updatePassword}
        />
      </div>
      <button type="submit">LOGIN</button>
    </form>
  );

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <MessagePopup message={message} isSuccess={isSuccess} />
        {loginForm()}
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
      setIsSuccess(true);
      addBlogRef.current.toggleVisiblity();
    } catch (error) {
      setMessage(`Unable to add: ${newBlog.title}`);
      console.log("unable to add");
      console.log(error);
      isSuccess(false);
    }
  };

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
        <ToggleBlogInfo blog={blog}>{blog.title}</ToggleBlogInfo>
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
export default App;
