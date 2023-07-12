const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { unknownEndpoint, errorHandler, requestLogger } = require('./utils/middleware');

morgan.token('postBody', function (req, res) {
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

app.use('/api/blogs', blogRouter);
app.use(unknownEndpoint);
app.use(errorHandler);


module.exports = app;