// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const amountOfLikes = blogs.reduce(function (initalLikes, blog) {
        return initalLikes += blog.likes;
    }, 0)
    return (blogs.length !== 0) ? amountOfLikes : 0;
}
const favoriteBlog = (blogs) => {
    const favBlog = blogs.reduce(function (currentlyMostLiked, blog) {
        if (currentlyMostLiked.likes < blog.likes) {
            return currentlyMostLiked = blog;
        } else {
            return currentlyMostLiked;
        }
    })
    return favBlog;
}

const whoWriteMostBlog = (blogs) => {
    if (blogs.length === 0) {
        return "blogs array is empty"
    }
    if (blogs.length === 1) {
        return blogs[0];
    }
    const authors = blogs.map(o => o.author).sort();
    let noOfBlogByAuthor = [];
    let mostBlog = 0;
    authors.forEach((author, currentIndex, arr) => {


        if (currentIndex === 0 || arr[currentIndex - 1] !== author) {
            noOfBlogByAuthor = noOfBlogByAuthor.concat({
                author: author,
                blogs: 1
            })
        } else if (arr[currentIndex] === author) {
            const indexOfMatchingBlog = noOfBlogByAuthor.findIndex(obj => obj.author === author);
            noOfBlogByAuthor[indexOfMatchingBlog] = {
                author: author,
                blogs: noOfBlogByAuthor[indexOfMatchingBlog].blogs + 1
            }
            if (mostBlog < noOfBlogByAuthor[indexOfMatchingBlog].blogs) {
                mostBlog = noOfBlogByAuthor[indexOfMatchingBlog].blogs
            }
        }
    })
    return [noOfBlogByAuthor.find(obj => obj.blogs === mostBlog)];
}
const authorWithMostLikes = (blogs) => {
    if (blogs.length === 0) {
        return "blogs array is empty"
    }
    if (blogs.length === 1) {
        return {
            author: blogs[0].author,
            likes: blogs[0].likes
        }
    }
    function compare(a, b) {
        if (a.author < b.author) {
            return -1;
        }
        if (a.author > b.author) {
            return 1;
        }
        return 0;
    }
    const sortedBlog = blogs.sort(compare)
    const totalLikesPerAuthor = sortedBlog.reduce((previousValue, currentValue, currentIndex, arr) => {
        if (previousValue.length === 0 || arr[currentIndex - 1].author !== currentValue.author) {
            return previousValue.concat({
                author: currentValue.author,
                likes: currentValue.likes
            })
        }
        const temp = previousValue.map((o) => {
            if (o.author === currentValue.author) {
                return {
                    author: o.author,
                    likes: o.likes + currentValue.likes
                }
            } else {
                return o;
            }
        })
        return temp;
    }, [])
    return totalLikesPerAuthor.sort((a, b) => {
        return b.likes - a.likes
    })[0]
}
module.exports = { dummy, totalLikes, favoriteBlog, whoWriteMostBlog, authorWithMostLikes };
