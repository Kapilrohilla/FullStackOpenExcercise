const Blog = require('../model/blog');
const User = require('../model/user');

const newBlogData = {
    title: "new data #1",
    author: "tester 1",
    url: "www.gmail.com",
    likes: 10,
}
const user1 = {
    username: "tester1",
    name: "tester",
    password: "testing"
}
const user2 = {
    username: "tester2",
    name: "tester",
    password: "testing"
}

const getBlogDataInDb = async () => await Blog.findOne({});

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
}
const userInDb = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
}

const initialBlog = [
    {
        title: "testing1",
        author: "admin",
        url: "https://example.com",
        likes: 99
    },
    {
        title: "testing2",
        author: "admin",
        url: "https://example.com",
        likes: 0
    }
];

module.exports = {
    initialBlog,
    newBlogData,
    getBlogDataInDb,
    blogsInDb,
    users: [user1, user2],
    userInDb
}