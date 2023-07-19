const mongoose = require('mongoose')
// const { info, error } = require('../utils/logger');
require('dotenv').config();
// const config = require('../utils/config');

// info('connecting to monogdb url' + config.MONGODB_URI);
// mongoose.connect(config.MONGODB_URI).then(r => {
//     info('connected to mongodb');
// }).catch(err => {
//     error(err);
// })

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    url: {
        type: String,
        required: true
    },
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;
