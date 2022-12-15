const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const calisteniaRouter = require('./controllers/calistenia')
const maquinasRouter = require('./controllers/maquinas')
const pesasRouter = require('./controllers/pesas')
const usuariosRouter = require('./controllers/usuarios')
const authRouter = require('./controllers/auth')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/equipamiento/calistenia', calisteniaRouter)
app.use('/equipamiento/maquinas', maquinasRouter)
app.use('/equipamiento/pesas', pesasRouter)
app.use('/usuarios', usuariosRouter)
app.use('/auth', authRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app