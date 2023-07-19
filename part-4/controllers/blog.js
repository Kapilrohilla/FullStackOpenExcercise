const blogRouter = require('express').Router();
const Blog = require('../model/mongo');

// get blogs
blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)
})
//get specific blog
blogRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    if (blog) {
        return res.status(200).json(blog);
    } else {
        return res.status(404).end();
    }
})
// add new blog
blogRouter.post('/', async (req, res) => {
    let body = req.body;

    if (!body.url || !body.title) {
        return res.status(400).json({
            err: "bad request - url, title is missing."
        })
    }
    if (!body.likes) {
        body.likes = 0;
    }
    const blog = new Blog(req.body);
    const response = await blog.save();

    return res.status(201).json(response);
})
// delete blog
blogRouter.delete('/:id', async (req, res) => {
    let id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.status(200).json({
        "success": `Blog with ${id} is deleted`
    })
})
// update blog;
blogRouter.put('/:id', async (req, res) => {

    const id = req.params.id;
    const updateBlog = req.body;
    await Blog.findByIdAndUpdate(id, updateBlog);
    res.status(200).json({
        "success": `Blog with ${id} is successfull`
    })
})
module.exports = blogRouter;