const mongoose = require('mongoose');
const supertest = require('supertest')

const app = require('../app');

const Blog = require('../model/blog');
const User = require('../model/user');
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

describe('deleting a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogs = await api.get('/api/blogs');
        const blogToDelete = blogs.body[0];
        await api.delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
    })
    test('when blog not found, statusCode=404', async () => {
        let random_id = "64a597aa0584557fa85ed747";
        await api.delete(`/api/blogs/${random_id}`)
            .expect(404);
    })
})

describe('update a blog', () => {
    test('statusCode 200, when update successful', async () => {
        const blogs = await api.get('/api/blogs');
        const blogToUpdate = blogs.body[0];
        const updatedBlog = {
            ...blogs,
            title: "update successfull"
        }
        await api.put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200);
    })
    test("statusCode 404 for no blog found with matching id", async () => {
        const randomId = "64a597aa0584557fa85ed747";

        await api.put(`/api/blogs/${randomId}`)
            .expect(404);
    });
})

describe('creating a user', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    })
    test('should give error when username length is less than 3', async () => {
        const invalidUsername = {
            username: "ab",
            name: "ab",
            password: "nothing"
        }
        await api
            .post('/api/user')
            .send(invalidUsername)
            .expect(400)
            .expect({ error: "username/password length is too short" });
    })

    test('should give error when password length is less than 3', async () => {
        const invalidPswd = {
            username: "abcde",
            name: "ab",
            password: "n"
        }
        await api
            .post('/api/user')
            .send(invalidPswd)
            .expect(400)
            .expect({ error: "username/password length is too short" })
    })
    test('should create a user', async () => {
        const userData = {
            username: "testingUser1",
            name: "by kapil",
            password: "testing"
        }
        await api.post('/api/user').send(userData).expect('Content-Type', /application\/json/).expect(201);
    })
})
afterAll(async () => {
    await mongoose.connection.close();
})