const mongoose = require('mongoose');

const database_url = process.env.MONGODB_URI;

mongoose.connect(database_url).then(r => {
    console.log("connected to mongodb" + database_url);
}).catch(err => {
    console.log(err);
});
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;