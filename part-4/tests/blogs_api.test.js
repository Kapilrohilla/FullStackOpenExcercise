const mongoose = require('mongoose');
const supertest = require('supertest')

const app = require('../app');

const Blog = require('../model/mongo');
const logger = require('../utils/logger');

const api = supertest(app);

const initialBlog = [
    {
        title: "testing1",
        author: "admin",
        url: "https://example.com",
        likes: 99
    },
    {
        title: "testing1",
        author: "admin",
        url: "https://example.com",
        likes: 99
    }
];

beforeEach(async () => {
    await Blog.deleteMany({});
    logger.info("previous entry deleted")
    let newData = new Blog(initialBlog[0]);
    await newData.save();
    newData = new Blog(initialBlog[1]);
    await newData.save();
    logger.info("initial entry added")
})

test('should return total number of blog = 2', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(2);
})

afterAll(async () => {
    await mongoose.connection.close();
})