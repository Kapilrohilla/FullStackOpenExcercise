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
        title: "testing2",
        author: "admin",
        url: "https://example.com",
        likes: 0
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
test('a blog should be exist', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('should contain 3 blogs', async () => {
    const newEntry = {
        title: "testing3",
        author: "admin",
        url: "https://example.com",
        likes: 1
    }
    await api.post('/api/blogs').send(newEntry);

    const responseAfterPost = await api.get('/api/blogs');
    expect(responseAfterPost.body).toHaveLength(3);
})

test('when likes property is missing it take default 0', async () => {
    const newEntry = {
        title: "testing3",
        author: "admin",
        url: "https://example.com"
    }
    const response = await api.post('/api/blogs').send(newEntry);
    console.log(response.body);
    expect(response.body.likes).toBe(0);
})
afterAll(async () => {
    await mongoose.connection.close();
})