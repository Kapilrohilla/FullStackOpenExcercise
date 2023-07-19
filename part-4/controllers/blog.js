const blogRouter = require('express').Router();
const Blog = require('../model/mongo');

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)
})
blogRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await Blog.findById(id)
    res.status(200).json(response).end();
})

blogRouter.post('/', async (req, res) => {
    let body = req.body;
    if (!body.likes) {
        body.likes = 0;
    }
    const blog = new Blog(req.body);
    const response = await blog.save();

    res.status(201).json(response);
})

module.exports = blogRouter;