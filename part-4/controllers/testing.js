const Blog = require("../model/blog");
const User = require("../model/user");
const testRouter = require("express").Router();

testRouter.post("/reset", async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  return res.status(204).end();
});

module.exports = testRouter;
