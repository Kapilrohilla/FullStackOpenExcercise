const blogRouter = require('express').Router();
const Blog = require('../model/mongo');

blogRouter.get('/', async (req, res, next) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})
blogRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await Blog.findById(id)
    res.json(response).end();
})

blogRouter.post('/', (req, res, next) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(r => {
            res.status(201).json(r);
        })
        .catch(err => {
            res.status(500).json({
                err: "internal error occurred or bad request"
            })
            next(err);
        })
})

module.exports = blogRouter;