const blogRouter = require('express').Router();
const Blog = require('../model/mongo');

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.status(201).json(blogs)
})
blogRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await Blog.findById(id)
    res.status(200).json(response).end();
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