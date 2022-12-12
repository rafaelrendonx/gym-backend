const homeRouter = require('express').Router()
const path = require('path');

homeRouter.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../build') });
})

module.exports = homeRouter