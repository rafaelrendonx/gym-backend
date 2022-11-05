require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Maquinas = require('./models/maquinas')
const Pesas = require('./models/pesas')
const Calistenia = require('./models/calistenia')
const Usuarios = require('./models/usuarios')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/equipamiento/maquinas', (request, response) => {
    Maquinas.find({}).then(equipo => {
        response.json(equipo);
    })
})

app.get("/equipamiento/maquinas/:id", (request, response, next) => {
    Maquinas.findById(request.params.id)
        .then(maquinas => {
            if (maquinas) {
                response.json(maquinas)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.get('/equipamiento/pesas', (request, response) => {
    Pesas.find({}).then(equipo => {
        response.json(equipo);
    })
})

app.get("/equipamiento/pesas/:id", (request, response, next) => {
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

app.get('/equipamiento/calistenia', (request, response) => {
    Calistenia.find({}).then(equipo => {
        response.json(equipo);
    })
})

app.get("/equipamiento/calistenia/:id", (request, response, next) => {
    Calistenia.findById(request.params.id)
    console.log(request.params.id)
        .then(equipamiento => {
            if (equipamiento) {
                response.json(equipamiento)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = app