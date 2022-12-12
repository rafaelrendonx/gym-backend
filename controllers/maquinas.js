const maquinasRouter = require('express').Router()
const Maquinas = require('../models/maquinas')

maquinasRouter.get('/', async (request, response) => {
    const equipamiento = await Maquinas.find({})
    response.json(equipamiento);
})

maquinasRouter.get('/:id', async (request, response) => {
    const equipamiento = await Maquinas.findById(request.params.id)
    if (equipamiento) {
        response.json(equipamiento)
    } else {
        response.status(404).end()
    }
})

module.exports = maquinasRouter