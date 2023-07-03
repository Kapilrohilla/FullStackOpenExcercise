const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const Blog = require('./mongo');

// middleware
app.use(express.json());
app.use(cors());


// get all blogs data
app.get('/api/blogs', (req, res) => {

    Blog.find({})
        .then(blogs => {
            res.json(blogs);
            // return;
        })
        .catch((err) => {
            console.log("get request error occur");
            res.status(500).json({
                "err": "internal error occurred"
            })
        })
})

app.post('/api/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then(r => {
            res.status(201).json(r);
        })
        .catch(err => {
            console.log("post req error occur");
            res.status(500).json({
                "err": "internal error occurred or bad request"
            })
        })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})