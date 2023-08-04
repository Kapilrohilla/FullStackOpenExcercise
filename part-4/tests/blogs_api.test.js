const mongoose = require('mongoose');
const supertest = require('supertest')

const app = require('../app');

const Blog = require('../model/blog');
const User = require('../model/user');

const api = supertest(app);
const helper = require('./helper_blogs_api');

beforeEach(async () => {
    await Blog.deleteMany({});
    let newData = new Blog(helper.initialBlog[0]);
    await newData.save();
    newData = new Blog(helper.initialBlog[1]);
    await newData.save();
})

describe('when user is not logged-in ', () => {
    test('should return number of blogs in database', async () => {
        const response = await api.get('/api/blogs')
            .expect('Content-Type', /application\/json/)
            .expect(200);
        expect(response.body).toHaveLength(2);
    })
    test('should return status code (401-unauthorized) while adding new blog without authorization', () => {
        api
            .post('/api/blogs')
            .send(helper.newBlogData)
            .expect(401)
            .expect({ error: "token invalid" });
    })
    test('should return status code (401-unauthorized while deleting blog withoud authorization', async () => {
        const idOfFirstBlogInDatabase = await helper.getBlogDataInDb();
        api
            .delete(`/api/blogs:${idOfFirstBlogInDatabase}`)
            .expect(401)
            .expect()
    })
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
    afterEach(async () => {
        await User.deleteMany({});
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

describe('loging a user', () => {
    test('should return 200 when username & password is correct', async () => {
        const correctUserData = {
            username: helper.users[0].username,
            password: helper.users[0].password
        }
        api.post('/api/login').send(correctUserData).expect(200)
    })
    test('should return 400 when username is incorrect', () => {
        const wrongUserName = {
            username: "wrongUsername",
            password: helper.users[0].password
        }
        api.post('/api/login').send(wrongUserName).expect(400).expect({
            err: "invalid username or password"
        })
    })
    test('should return 400 when password is incorrect', () => {
        const wrongUserName = {
            username: helper.users[0].username,
            password: "wrongPassword"
        }
        api.post('/api/login').send(wrongUserName).expect(400).expect({
            err: "invalid username or password"
        })
    })
})

// add, update, delete test remained

afterAll(async () => {
    await mongoose.connection.close();
})