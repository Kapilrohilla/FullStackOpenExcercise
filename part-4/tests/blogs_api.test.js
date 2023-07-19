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

describe('when there is initially some blogs', () => {
    test('should return number of blogs in database', async () => {
        const response = await api.get('/api/blogs')
            .expect('Content-Type', /application\/json/)
            .expect(200);
        expect(response.body).toHaveLength(2);
    })
})

describe('viewing the specific blog', () => {
    // need to update
    test('a blog should be exist', async () => {
        const response = await api.get('/api/blogs').expect(200);
        const lastEntry = response.body[response.body.length - 1]

        const response2 = await api.get(`/api/blogs/${lastEntry.id}`).expect(200);
        expect(response2.body).toEqual(lastEntry);
    })
    test('fails with statusCode 404 if blog doesn\'t exist', async () => {
        const invalidId = "64a59bcf1de30a7d2da9b00f";
        await api.get(`/api/blogs/${invalidId}`).expect(404);
    });
})

describe('addition of a new blog', () => {

    test('Successfully add new blog when all data is available', async () => {
        const newEntry = {
            title: "testing3",
            author: "admin",
            url: "https://example.com",
            likes: 1
        }
        await api.post('/api/blogs').send(newEntry).expect(201);

        const responseAfterPost = await api.get('/api/blogs').expect(200);
        expect(responseAfterPost.body).toHaveLength(3);
    })

    test('when likes property is missing it take default likes=0', async () => {
        const newEntry = {
            title: "testing3",
            author: "admin",
            url: "https://example.com"
        }
        const response = await api.post('/api/blogs').send(newEntry).expect(201);

        expect(response.body.likes).toBe(0);
    })
    test('when title or url is missing, it should response status code 400', async () => {
        const newEntry = {
            url: "https://example.com"
        }
        const response = await api.post('/api/blogs').send(newEntry);

        expect(response.status).toBe(400);
    })
})

afterAll(async () => {
    await mongoose.connection.close();
})