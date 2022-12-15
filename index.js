const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const homeRouter = require('./controllers/home')

const server = http.createServer(app)

app.use('/', homeRouter)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})
