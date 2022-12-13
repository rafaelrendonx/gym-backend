const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

const { expressjwt: jwt } = require("express-jwt");

const getToken = (request) => {
  const { authorization } = request.headers;

  if (!authorization) return null;

  const [type, token] = authorization.split(" ");
  return type === "Bearer" || type === "Token" ? token : null;
};

const auth = jwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  requestProperty: "user",
  getToken,
});


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    auth
  }