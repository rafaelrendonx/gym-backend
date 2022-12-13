const usuariosRouter = require('express').Router()
const Usuarios = require('../models/usuarios')
const { auth } = require('../utils/middleware')

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

usuariosRouter.get('/getUserData', async (request, response) => {
    try {
        const { correo } = request.query;

        if (correo || request.user) {
            const usuario = correo
                ? await Usuarios.findOne(
                    { correo: correo },
                    { correo: 1 }
                )
                : await Usuarios.findById(request.user.userId, {
                    correo: 1,
                });
            if (!usuario) {
                return response.status(404).json({
                    mensaje: "Error",
                    detalles: "No existe este usuario.",
                });
            }
            return response.status(200).json({
                mensaje: "Info",
                detalles: user,
            });
        }

        return response.status(400).json({
            mensaje: "Error",
            detalles: "Es necesario enviar al menos un parámetro.",
        });
    } catch (e) {
        console.log(e.message);
        return response.status(500).json({
            mensaje: "Error",
            detalles: "Error fatal",
        });
    }
});


module.exports = usuariosRouter