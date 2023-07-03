const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const Blog = require('./mongo')

// middleware
app.use(express.json());
app.use(cors());

morgan.token('postBody', function (req, res) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :postBody'))

// get all blogs data
app.get('/api/blogs', (req, res) => {
    Blog.find({})
        .then(blogs => {
            res.json(blogs)
            // return;
        })
        .catch(() => {
            res.status(500).json({
                "err": 'internal error occurred'
            })
            next(err);
        })
})

app.post('/api/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then(r => {
            res.status(201).json(r)
        })
        .catch(err => {
            res.status(500).json({
                err: 'internal error occurred or bad request'
            })
            next(err);
        })
})
const errorHandler = (err, req, res, next) => {
    console.log(err.message);
    next(err);
}
app.use(errorHandler);
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
