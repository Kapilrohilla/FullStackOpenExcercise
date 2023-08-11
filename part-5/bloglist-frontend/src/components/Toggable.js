import React, { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const Toggable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const toggleVisiblity = () => {
    setVisible(!visible);
  };

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  useImperativeHandle(refs, () => {
    return { toggleVisiblity };
  });
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisiblity}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{props.children}</div>
        <div>
          <button onClick={toggleVisiblity}>Cancel</button>
        </div>
      </div>
    </div>
  );
});

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
Toggable.displayName = "Toggable"
export default Toggable;
