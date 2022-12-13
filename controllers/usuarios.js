const usuariosRouter = require('express').Router()
const Usuarios = require('../models/usuarios')

usuariosRouter.get('/', async (request, response) => {
    const usuario = await Usuarios.find({})
    response.json(usuario);
})

usuariosRouter.get('/:id', async (request, response) => {
    const usuario = await Usuarios.findById(request.params.id)
    if (usuario) {
        response.json(usuario)
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

usuariosRouter.post("/register", async (request, response) => {

    try {
        const body = request.body;

        const usuario = new Usuarios({
            nombre: body.nombre,
            password: body.password,
            correo: body.correo,
        });

        usuario.hashPassword(body.password)

        await usuario.save()

        response.status(201).json({
            mensaje: "Usuario Registrado",
            detalles: {
                userId: usuario._id,
                token: usuario.generateJWT(),
            }
        })
    }
    catch (e) {
        console.log(e.message)
        return response.status(500).json({
            mensaje: "Error",
            detalles: "Error Register",
        })
    }
})

usuariosRouter.post("/login", (request, response) => {

    try {
        const { correo, password } = request.body
        const usuario = Usuarios.findOne({ correo })

        if (!usuario) {
            return response.status(404).json({
                mensaje: "Usuario no encontrado",
            })
        }

        if (usuario.verifyPassword(password)) {
            return response.status(200).json({
                mensaje: "Usuario Logeado",
                detalles: {
                    userId: usuario._id,
                    token: usuario.generateJWT(),
                }
            })
        }

        return response.status(400).json({
            mensaje: "Password Incorrecto",
        })
    }
    catch (e) {
        console.log(e.message)
        return res.status(500).json({
            mensaje: "Error",
            detalles: "Error Login",
        });
    }
})

module.exports = usuariosRouter