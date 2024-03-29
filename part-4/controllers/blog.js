const blogRouter = require('express').Router();
const Blog = require('../model/blog');
const User = require('../model/user');
const { userExtractor } = require('../utils/middleware');

// get blogs
blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
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
blogRouter.post('/', userExtractor, async (req, res) => {
    let body = req.body;
    if (!req.user) {
        return res.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(req.user.id);
    if (!body.url || !body.title) {
        return res.status(400).json({
            err: "bad request - url, title is missing."
        })
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: body.userId
    });
    const response = await blog.save();

    user.blogs = user.blogs.concat(response._id);
    await user.save();

    return res.status(201).json(response);
})
// delete blog
blogRouter.delete('/:id', userExtractor, async (req, res) => {
    let id = req.params.id;

    const response = await Blog.findByIdAndDelete(id);
    if (!response) {
        return res.status(400).end();
    }
    if (!(req.user && req.user.blogs.includes(id))) {
        return res.sendStatus(401);
    }

    req.user.blogs.splice(req.user.blogs.indexOf(id), 1)
    await User.findByIdAndUpdate(req.user.id, req.user);

    res.status(202).json({ "success": `Blog with ${id} is deleted by ${req.user.username}` }).end();
})
// update blog;
blogRouter.put('/:id', userExtractor, async (req, res) => {
    const id = req.params.id;
    const updatedBlog = req.body;

    const response = await Blog.findByIdAndUpdate(id, updatedBlog);
    if (!response) {
        return res.status(404).json({
            err: `blog not found with ${id}`
        });
    }

    if (!(req.user && req.user.blogs.includes(id))) {
        return res.sendStatus(401);
    }

    updatedBlog.user = req.user.id

    return res.status(200).json({
        "success": `Blog with ${id} is successfull by ${req.user.username}`
    })
})
module.exports = blogRouter;