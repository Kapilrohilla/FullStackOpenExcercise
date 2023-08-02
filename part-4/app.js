const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { unknownEndpoint, errorHandler, requestLogger, tokenExtractor } = require('./utils/middleware');

morgan.token('postBody', function (req) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status : response-time ms - :res[content-length] :postBody'));

mongoose.set('strictQuery', false);

logger.info(`connecting to ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to Mongodb');
    })
    .catch((err) => {
        logger.error('error connecting to mongoDB: ', err.message);
    })

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(tokenExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);
app.use(unknownEndpoint);
app.use(errorHandler);


module.exports = app;