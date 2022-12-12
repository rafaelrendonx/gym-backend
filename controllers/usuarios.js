const usuariosRouter = require('express').Router()
const Usuarios = require('../models/usuarios')

usuariosRouter.get('/', async (request, response) => {
    const equipamiento = await Usuarios.find({})
    response.json(equipamiento);
})

usuariosRouter.get('/:id', async (request, response) => {
    const equipamiento = await Usuarios.findById(request.params.id)
    if (equipamiento) {
        response.json(equipamiento)
    } else {
        response.status(404).end()
    }
})

usuariosRouter.put('/:id', async (request, response) => {
    const body = request.body

    const usuario = {
        nombre: body.nombre,
        password: body.password,
        correo: body.correo,
    }

    const usuarioActualizado = await Usuarios.findByIdAndUpdate(request.params.id, usuario, { new: true })
    response.json(usuarioActualizado)
      
})

usuariosRouter.delete('/:id', async (request, response) => {
    await Usuarios.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

usuariosRouter.post("/registro", async (request, response) => {
    const body = request.body;

    const usuario = new Usuarios({
        nombre: body.nombre,
        password: body.password,
        correo: body.correo,
    });

    const usuarioGuardado = await usuario.save()
    response.json(usuarioGuardado)
    
})

usuariosRouter.post("/login", (request, response) => {
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