const calisteniaRouter = require('express').Router()
const Calistenia = require('../models/calistenia')

calisteniaRouter.get('/', async (request, response) => {
    const equipamiento = await Calistenia.find({})
    response.json(equipamiento);
})


calisteniaRouter.get('/:id', async (request, response) => {
    const equipamiento = await Calistenia.findById(request.params.id)
    if (equipamiento) {
        response.json(equipamiento)
    } else {
        response.status(404).end()
    }
})

module.exports = calisteniaRouter