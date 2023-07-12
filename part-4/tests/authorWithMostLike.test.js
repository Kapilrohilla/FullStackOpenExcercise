const { authorWithMostLikes } = require('../utils/list_helper');
const listWithMultipleBlog = require('./mostBlog.test');

describe('testing which author get most number of likes', () => {

    test('should return blog list is empty', () => {
        expect(authorWithMostLikes([])).toMatch('blogs array is empty');
    })
    test('should return same blog if blogs length is empty', () => {
        const result = authorWithMostLikes([listWithMultipleBlog[0]]);
        const expectation = {
            author: listWithMultipleBlog[0].author,
            likes: listWithMultipleBlog[0].likes
        }
        expect(result).toEqual(expectation);
    })
    test('should return ', () => {
        const result = authorWithMostLikes(listWithMultipleBlog)
        const expectation = {
            author: 'kapil',
            likes: 45
        }
        expect(result).toEqual(expectation);
    })
});