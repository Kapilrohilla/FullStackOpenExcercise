const blogRouter = require('express').Router();
const Blog = require('../model/mongo');

blogRouter.get('/', (req, res, next) => {
    Blog.find({})
        .then((blog) => {
            res.json(blog);
            return;
        })
        .catch((err) => {
            res.status(500).json({
                "err": "internal error occurred"
            })
            next(err);
        })
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