const pesasRouter = require('express').Router()
const Pesas = require('../models/pesas')

pesasRouter.get('/', async (request, response) => {
    const equipamiento = await Pesas.find({})
    response.json(equipamiento);
})


pesasRouter.get('/:id', async (request, response) => {
    const equipamiento = await Pesas.findById(request.params.id)
    if (equipamiento) {
        response.json(equipamiento)
    } else {
        response.status(404).end()
    }
})

module.exports = pesasRouter