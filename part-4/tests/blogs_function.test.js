const list_helper = require('../utils/list_helper');
const listWithMultipleBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'king',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'king',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 3,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'kapil',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 15,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'kapil',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 15,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'kapil',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 15,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 17,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 17,
        __v: 0
    }
]

describe('testing which author get most number of likes', () => {

    test('should return blog list is empty', () => {
        expect(list_helper.authorWithMostLikes([])).toMatch('blogs array is empty');
    })
    test('should return same blog if blogs length is empty', () => {
        const result = list_helper.authorWithMostLikes([listWithMultipleBlog[0]]);
        const expectation = {
            author: listWithMultipleBlog[0].author,
            likes: listWithMultipleBlog[0].likes
        }
        expect(result).toEqual(expectation);
    })
    test('should return ', () => {
        const result = list_helper.authorWithMostLikes(listWithMultipleBlog)
        const expectation = {
            author: 'kapil',
            likes: 45
        }
        expect(result).toEqual(expectation);
    })
});

describe('excercise 4.3: helper function', () => {

    test('dummy return one', () => {
        const blogs = [];
        const result = list_helper.dummy(blogs);
        expect(result).toBe(1);
    })
})

describe('author with most number of blogs', () => {
    test('should be equal to "Edsger W. Dijkstra"', () => {
        const result = list_helper.whoWriteMostBlog(listWithMultipleBlog);
        expect(result).toEqual([{
            author: 'Edsger W. Dijkstra',
            blogs: 3
        }])
    })
    test('should return an Error', () => {
        const result = list_helper.whoWriteMostBlog([]);
        expect(result).toMatch("blogs array is empty");
    })
    test('should return the same object', () => {
        const result = {
            author: "kapil",
            likes: 10
        }
        expect(list_helper.whoWriteMostBlog([result])).toEqual(result)
    })
});

describe('most liked blog', () => {

    const result = list_helper.favoriteBlog(listWithMultipleBlog);
    test('should give most liked blog object', () => {
        expect(result).toEqual({
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 17,
            __v: 0
        })
    })
})

const totalLikes = require('../utils/list_helper').totalLikes;
describe('total likes', () => {

    test('of empty list is zero', () => {
        const blogs = [];
        expect(list_helper.totalLikes(blogs)).toBe(0);
    })

    test('when list has only one blog equals the likes of that', () => {
        const listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        ]
        expect(totalLikes(listWithOneBlog)).toBe(5);
    })
    test('of a bigger list is calculated right', () => {
        expect(totalLikes(listWithMultipleBlog)).toBe(89);
    })

})