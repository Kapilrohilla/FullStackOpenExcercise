const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../model/blog');
const User = require('../model/user');
const { SECRET_CODE_FOR_TOKEN } = require('../utils/config');

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
// for token implementation
const getToken = req => {
    const authorization = req.get('authorization');

    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace("Bearer ", "");
    }
    return null;
}
// add new blog
blogRouter.post('/', async (req, res) => {
    let body = req.body;

    const decodedToken = jwt.verify(getToken(req), SECRET_CODE_FOR_TOKEN);
    console.log(decodedToken);
    if (!decodedToken) {
        return res.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);

    if (!body.url || !body.title) {
        return res.status(400).json({
            err: "bad request - url, title is missing."
        })
    }
    if (!body.likes) {
        body.likes = 0;
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
blogRouter.delete('/:id', async (req, res) => {
    let id = req.params.id;
    const response = await Blog.findByIdAndDelete(id);

    if (response === null) {
        return res.status(404).end();
    }

    return res.status(204).json({
        "success": `Blog with ${id} is deleted`
    })
})
// update blog;
blogRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedBlog = req.body;

    const response = await Blog.findByIdAndUpdate(id, updatedBlog);

    if (response === null) {
        return res.status(404).json({
            err: `blog not found with ${id}`
        });
    }

    return res.status(200).json({
        "success": `Blog with ${id} is successfull`
    })
})
module.exports = blogRouter;