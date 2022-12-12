const usuariosRouter = require('express').Router()
const Usuarios = require('../models/usuarios')

usuariosRouter.get('/', (request, response) => {
    Usuarios.find({}).then(usuario => {
        response.json(usuario);
    })
})

usuariosRouter.get('/:id', (request, response, next) => {
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

usuariosRouter.put('/:id', (request, response, next) => {
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

usuariosRouter.delete('/:id', (request, response, next) => {
    Usuarios.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

usuariosRouter.post("/registro", (request, response, next) => {
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

usuariosRouter.post("/login", (request, response, next) => {
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

module.exports = usuariosRouter