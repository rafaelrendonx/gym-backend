const maquinasRouter = require('express').Router()
const Maquinas = require('../models/maquinas')

maquinasRouter.get('/', (request, response) => {
    Maquinas.find({}).then(equipo => {
        response.json(equipo);
    })
})

maquinasRouter.get('/:id', (request, response, next) => {
    Maquinas.findById(request.params.id)
        .then(equipamiento => {
            if (equipamiento) {
                response.json(equipamiento)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

module.exports = maquinasRouter