const logger = require('./logger');

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method);
    logger.info('Path: ', req.path);
    logger.info('Body:', req.body);
    next();
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
}

const errorHandler = (err, req, res) => {
    logger.error(err.message);

    if (err.name === "CastError") {
        return res.status(404).send({ error: "malformatted id" });
    } else if (err.name === 'ValidationError') {
        return res.status(404).json({ "err": err.message })
    }
}

const tokenExtractor = (req, _res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', "");
    }
    next();
}
module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}