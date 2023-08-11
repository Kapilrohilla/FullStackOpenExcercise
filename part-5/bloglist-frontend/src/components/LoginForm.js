import React from "react";
import PropTypes from "prop-types";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLoginSubmit}>
      <div className="username">
        <label htmlFor="getUsername">username: </label>
        <input
          type="text"
          value={props.loginCredential.username}
          onChange={props.updateCredentials.updateUsername}
        />
      </div>
      <div className="password">
        <label htmlFor="getPassword">password: </label>
        <input
          type="password"
          value={props.loginCredential.password}
          onChange={props.updateCredentials.updatePassword}
        />
      </div>
      <button type="submit">LOGIN</button>
    </form>
  );
};
LoginForm.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired,
  loginCredential: PropTypes.exact({
    username: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  updateCredentials: PropTypes.exact({
    updateUsername: PropTypes.func,
    updatePassword: PropTypes.func,
  }),
};
export default LoginForm;
