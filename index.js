require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Maquinas = require('./models/maquinas')
const Pesas = require('./models/pesas')
const Calistenia = require('./models/calistenia')
const Usuarios = require('./models/usuarios')

const path = require('path');
const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'build') });
})

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

app.get('/usuarios/', (request, response) => {
    Usuarios.find({}).then(usuario => {
        response.json(usuario);
    })
})

app.get("/usuarios/:id", (request, response, next) => {
    Usuarios.findById(request.params.id)
        .then(usuario => {
            if (usuario) {
                response.json(usuario)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post("/usuarios/register", (request, response, next) => {
    const body = request.body;

    const usuario = new Usuarios({
        nombre: body.nombre,
        password: body.password,
        correo: body.correo,
    });

    usuario.save()
        .then(savedUsuario => {
            response.json(savedUsuario)
        })
        .catch(error => next(error))
})

app.post("/usuarios/login", (request, response, next) => {
    const { correo, password } = request.body

    try {
        const usuario = Usuarios.findOne({ correo })

        if (!usuario) {
            return response.status(400).json({
                mensaje: "Usuario no encontrado",
            })
        }

        const validPassword = () => {
            return password === usuario.password
        }

        if (!validPassword) {
            return response.status(400).json({
                mensaje: "Password Incorrecto",
            })
        }

        response.json({
            mensaje: "Ok, usuario logeado"
        })


    } catch (error) {
        console.log(error)
    }
})

app.put('/usuarios/:id', (request, response, next) => {
    const body = request.body

    const usuario = {
        nombre: body.nombre,
        password: body.password,
        correo: body.correo,
    }

    Usuarios.findByIdAndUpdate(request.params.id, usuario, { new: true })
        .then(updatedUsuario => {
            response.json(updatedUsuario)
        })
        .catch(error => next(error))
})


app.delete("/usuarios/:id", (request, response, next) => {
    Usuarios.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = app