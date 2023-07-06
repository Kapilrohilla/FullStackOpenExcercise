const list_helper = require('../utils/list_helper');

describe('excercise 4.3: helper function', () => {

    test('dummy return one', () => {
        const blogs = [];
        const result = list_helper.dummy(blogs);
        expect(result).toBe(1);
    })
})