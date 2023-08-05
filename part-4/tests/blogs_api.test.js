const mongoose = require('mongoose');
const supertest = require('supertest')

const app = require('../app');

const Blog = require('../model/blog');
const User = require('../model/user');

const api = supertest(app);
const helper = require('./helper_blogs_api');

var token;
beforeAll(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlog);
    await User.deleteMany({});
    await api.post('/api/user')
        .send(helper.userForToken);
    const loginResponse = await api.post('/api/login').send({
        username: helper.userForToken.username,
        password: helper.userForToken.password
    })

    token = `Bearer ${loginResponse.body.token}`;
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

describe('addition of a new blog when user logged-in', () => {

    test('Successfully add new blog when all data is available', async () => {
        const newEntry = {
            title: "testing3",
            author: "admin",
            url: "https://example.com",
            likes: 1
        }
        await api.post('/api/blogs').set("authorization", token).send(newEntry).expect(201);

        const responseAfterPost = await api.get('/api/blogs').expect(200);
        expect(responseAfterPost.body).toHaveLength(3);
    })

    test('when likes property is missing it take default likes=0', async () => {
        const newEntry = {
            title: "testing3",
            author: "admin",
            url: "https://example.com"
        }
        const response = await api.post('/api/blogs').set("authorization", token).send(newEntry).expect(201);
        expect(response.body.likes).toBe(0);
    })
    test('when title or url is missing, it should response status code 400', async () => {
        const newEntry = {
            url: "https://example.com"
        }
        const response = await api.post('/api/blogs').set("authorization", token).send(newEntry);

        expect(response.status).toBe(400);
    })
})

describe('deleting a blog', () => {
    test('succeeds with status code 202 if id is valid', async () => {
        // adding a blog with logged-in user
        const response = await api.post('/api/blogs').set("authorization", token).send(helper.newBlogData);
        const blogToDelete = response.body;
        await api.delete(`/api/blogs/${blogToDelete.id}`)
            .set("authorization", token)
            .expect(202);
    })
    test('when blog not found, statusCode=400', async () => {
        let random_id = "64a597aa0584557fa85ed747";
        await api.delete(`/api/blogs/${random_id}`)
            .set('authorization', token)
            .expect(400);
    })
})

describe('update a blog', () => {
    test('statusCode 200, when update successful', async () => {
        // adding new Blog to update
        const response = await api.post('/api/blogs').set("authorization", token).send(helper.newBlogData);
        const blogToUpdate = response.body;

        const updatedBlog = {
            ...blogToUpdate,
            title: "update successfull"
        }

        await api.put(`/api/blogs/${blogToUpdate.id}`)
            .set("authorization", token)
            .send(updatedBlog)
            .expect(200);
    })
    test("statusCode 404 for no blog found with matching id", async () => {
        const randomId = "64a597aa0584557fa85ed747";

        await api.put(`/api/blogs/${randomId}`)
            .set('authorization', token)
            .expect(404);
    });
})


afterAll(async () => {
    await mongoose.connection.close();
})