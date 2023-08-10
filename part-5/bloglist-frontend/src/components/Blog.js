const Blog = ({ title }) => <div>{title}</div>;

const BlogDetail = ({ blog }) => {
  return (
    <>
      <p>url - {blog.url}</p>
      <p>
        likes - {blog.likes} <button>like</button>
      </p>
      <p>author - {blog.author}</p>
    </>
  );
};
export default Blog;
export { BlogDetail };
