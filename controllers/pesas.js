const pesasRouter = require('express').Router()
const Pesas = require('../models/pesas')

pesasRouter.get('/', (request, response) => {
    Pesas.find({}).then(equipo => {
        response.json(equipo);
    })
})

pesasRouter.get('/:id', (request, response, next) => {
    Pesas.findById(request.params.id)
        .then(equipamiento => {
            if (equipamiento) {
                response.json(equipamiento)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

module.exports = pesasRouter