import PropTypes from "prop-types";
const Blog = ({ title }) => <span>{title}</span>;
Blog.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Blog;
