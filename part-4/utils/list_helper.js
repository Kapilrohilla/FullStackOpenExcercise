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
module.exports = { dummy, totalLikes, favoriteBlog };
