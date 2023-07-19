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
    const response = await Blog.findById(id)
    res.status(200).json(response).end();
})
// add new blog
blogRouter.post('/', async (req, res) => {
    let body = req.body;
    if (!body.likes) {
        body.likes = 0;
    }
    const blog = new Blog(req.body);
    const response = await blog.save();

    res.status(201).json(response);
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