const calisteniaRouter = require('express').Router()
const Calistenia = require('../models/calistenia')

calisteniaRouter.get('/', (request, response) => {
    Calistenia.find({}).then(equipo => {
        response.json(equipo);
    })
})

calisteniaRouter.get('/:id', (request, response, next) => {
    Calistenia.findById(request.params.id)
        .then(equipamiento => {
            if (equipamiento) {
                response.json(equipamiento)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

module.exports = calisteniaRouter